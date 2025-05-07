import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { optionPersonnalisationSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string; optionId: string } }) {
  try {
    const option = await prisma.optionPersonnalisation.findUnique({
      where: {
        id: params.optionId,
        oeuvreId: params.id,
      },
    })

    if (!option) {
      return NextResponse.json({ error: "Option de personnalisation non trouvée" }, { status: 404 })
    }

    return NextResponse.json(option)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string; optionId: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier que l'option existe
    const option = await prisma.optionPersonnalisation.findUnique({
      where: {
        id: params.optionId,
      },
      include: { oeuvre: true },
    })

    if (!option) {
      return NextResponse.json({ error: "Option de personnalisation non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est l'auteur de l'œuvre ou un admin
    if (option.oeuvre.auteurId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = optionPersonnalisationSchema.parse(body)

    // Mettre à jour l'option
    const updatedOption = await prisma.optionPersonnalisation.update({
      where: { id: params.optionId },
      data: {
        nom: validatedData.nom,
        details: validatedData.details,
      },
    })

    return NextResponse.json(updatedOption)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string; optionId: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier que l'option existe
    const option = await prisma.optionPersonnalisation.findUnique({
      where: { id: params.optionId },
      include: { oeuvre: true },
    })

    if (!option) {
      return NextResponse.json({ error: "Option de personnalisation non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est l'auteur de l'œuvre ou un admin
    if (option.oeuvre.auteurId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Supprimer l'option
    await prisma.optionPersonnalisation.delete({
      where: { id: params.optionId },
    })

    return NextResponse.json({ message: "Option de personnalisation supprimée avec succès" })
  } catch (error) {
    return handleError(error)
  }
}
