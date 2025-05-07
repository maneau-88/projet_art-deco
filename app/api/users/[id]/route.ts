import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth, requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { userSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier que l'utilisateur demande ses propres informations ou est un admin
    if (authUser.id !== params.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        premiumStatus: true,
        artistProfile: authUser.role === Role.ADMIN || authUser.role === Role.ARTISTE,
        printerProfile: authUser.role === Role.ADMIN || authUser.role === Role.IMPRIMEUR,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json(user)
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

    // Vérifier que l'utilisateur modifie ses propres informations ou est un admin
    if (authUser.id !== params.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = userSchema.partial().parse(body)

    // Seul un admin peut changer le rôle
    if (validatedData.role && authUser.role !== Role.ADMIN) {
      delete validatedData.role
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        profile: true,
        premiumStatus: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await requireRole(req, [Role.ADMIN])

    if (typeof user === "object" && "status" in user) {
      return user // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" })
  } catch (error) {
    return handleError(error)
  }
}
