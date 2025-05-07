import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { oeuvreSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const oeuvre = await prisma.oeuvre.findUnique({
      where: { id: params.id },
      include: {
        auteur: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                pseudo: true,
                avatar: true,
              },
            },
          },
        },
        categorie: true,
        tags: true,
        personnalisations: true,
      },
    })

    if (!oeuvre) {
      return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
    }

    return NextResponse.json(oeuvre)
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

    const oeuvre = await prisma.oeuvre.findUnique({
      where: { id: params.id },
    })

    if (!oeuvre) {
      return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est l'auteur ou un admin
    if (oeuvre.auteurId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = oeuvreSchema.partial().parse(body)

    // Mettre à jour l'œuvre
    const updatedOeuvre = await prisma.oeuvre.update({
      where: { id: params.id },
      data: {
        titre: validatedData.titre,
        description: validatedData.description,
        categorieId: validatedData.categorieId,
        tags: validatedData.tags
          ? {
              set: [], // Supprimer les tags existants
              connect: validatedData.tags.map((tagId) => ({ id: tagId })),
            }
          : undefined,
      },
      include: {
        auteur: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                pseudo: true,
              },
            },
          },
        },
        categorie: true,
        tags: true,
        personnalisations: true,
      },
    })

    return NextResponse.json(updatedOeuvre)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const oeuvre = await prisma.oeuvre.findUnique({
      where: { id: params.id },
    })

    if (!oeuvre) {
      return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur est l'auteur ou un admin
    if (oeuvre.auteurId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Supprimer l'œuvre
    await prisma.oeuvre.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Œuvre supprimée avec succès" })
  } catch (error) {
    return handleError(error)
  }
}
