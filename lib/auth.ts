import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "./supabase"
import prisma from "./prisma"
import type { Role } from "@prisma/client"

export async function getUserFromRequest(req: NextRequest) {
  // Récupérer le token JWT de l'en-tête Authorization
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)

  // Vérifier le token avec Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  // Récupérer l'utilisateur depuis la base de données
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { premiumStatus: true },
  })

  return dbUser
}

export async function requireAuth(req: NextRequest) {
  const user = await getUserFromRequest(req)

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
  }

  return user
}

export async function requireRole(req: NextRequest, allowedRoles: Role[]) {
  const user = await requireAuth(req)

  if (typeof user === "object" && "status" in user) {
    return user // C'est une réponse d'erreur, pas un utilisateur
  }

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
  }

  return user
}

export async function requirePremium(req: NextRequest) {
  const user = await requireAuth(req)

  if (typeof user === "object" && "status" in user) {
    return user // C'est une réponse d'erreur, pas un utilisateur
  }

  if (!user.premiumStatus || (!user.premiumStatus.subscribed && !user.premiumStatus.grantedByAdmin)) {
    return NextResponse.json({ error: "Fonctionnalité réservée aux utilisateurs premium" }, { status: 403 })
  }

  return user
}
