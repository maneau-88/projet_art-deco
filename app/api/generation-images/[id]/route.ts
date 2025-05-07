import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requirePremium, requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requirePremium(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const imageRequest = await prisma.generationImageRequest.findUnique({
      where: { id: params.id },
    })

    if (!imageRequest) {
      return NextResponse.json({ error: "Demande de génération d'image non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est le propriétaire ou un admin
    if (imageRequest.userId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    return NextResponse.json(imageRequest)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireRole(req, [Role.ADMIN])

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const imageRequest = await prisma.generationImageRequest.findUnique({
      where: { id: params.id },
    })

    if (!imageRequest) {
      return NextResponse.json({ error: "Demande de génération d'image non trouvée" }, { status: 404 })
    }

    const { resultat } = await req.json()

    // Mettre à jour le résultat de la génération d'image
    const updatedImageRequest = await prisma.generationImageRequest.update({
      where: { id: params.id },
      data: { resultat },
    })

    // Créer une notification pour l'utilisateur
    await prisma.notification.create({
      data: {
        userId: imageRequest.userId,
        message: "Votre image a été générée avec succès.",
      },
    })

    return NextResponse.json(updatedImageRequest)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requirePremium(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const imageRequest = await prisma.generationImageRequest.findUnique({
      where: { id: params.id },
    })

    if (!imageRequest) {
      return NextResponse.json({ error: "Demande de génération d'image non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est le propriétaire ou un admin
    if (imageRequest.userId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Supprimer la demande
    await prisma.generationImageRequest.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Demande de génération d'image supprimée avec succès" })
  } catch (error) {
    return handleError(error)
  }
}
