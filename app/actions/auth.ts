"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { z } from "zod"
import { redirect } from "next/navigation"

// Schéma de validation pour l'inscription
const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  userType: z.string().min(1, "Veuillez sélectionner un type d'utilisateur"),
})

type RegisterInput = z.infer<typeof registerSchema>

export async function registerUser(data: RegisterInput) {
  try {
    // Valider les données
    const validatedData = registerSchema.parse(data)

    // Créer un client Supabase
    const supabase = createServerActionClient({ cookies })

    // Créer un nouvel utilisateur
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (authError) {
      return { error: authError.message }
    }

    // Créer un profil utilisateur
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        user_type: validatedData.userType,
      })

      if (profileError) {
        return { error: profileError.message }
      }
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Erreur de validation
      return { error: error.errors[0].message }
    }

    return { error: "Une erreur est survenue lors de l'inscription" }
  }
}

export async function signInWithGoogle() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { url: data.url }
}

export async function signInWithFacebook() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { url: data.url }
}

export async function signIn(email: string, password: string) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { user: data.user }
}

export async function signOut() {
  const supabase = createServerActionClient({ cookies })

  await supabase.auth.signOut()

  redirect("/")
}
