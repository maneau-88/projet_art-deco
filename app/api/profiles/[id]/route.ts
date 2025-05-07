import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { profileSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: params.id },
    })

    if (!profile) {
      return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Récupérer le profil pour vérifier qu'il appartient à l'utilisateur
    const profile = await prisma.profile.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!profile) {
      return NextResponse.json({ error: "Profil non trouvé" }, { status: 404 })
    }

    // Vérifier que l'utilisateur modifie son propre profil ou est un admin
    if (profile.userId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = profileSchema.parse(body)

    const updatedProfile = await prisma.profile.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    return handleError(error)
  }
}
