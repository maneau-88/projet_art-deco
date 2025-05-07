import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { oeuvreSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(req.url)
    const categorieId = searchParams.get("categorieId")
    const tagId = searchParams.get("tagId")
    const approuvee = searchParams.get("approuvee") === "true"

    // Construire les filtres
    const where: any = {}

    if (categorieId) {
      where.categorieId = categorieId
    }

    if (tagId) {
      where.tags = {
        some: {
          id: tagId,
        },
      }
    }

    if (searchParams.has("approuvee")) {
      where.approuvee = approuvee
    }

    const oeuvres = await prisma.oeuvre.findMany({
      where,
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

    return NextResponse.json(oeuvres)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier que l'utilisateur n'est pas un imprimeur
    if (authUser.role === Role.IMPRIMEUR) {
      return NextResponse.json({ error: "Les imprimeurs ne peuvent pas créer d'œuvres" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = oeuvreSchema.parse(body)

    // Créer l'œuvre
    const oeuvre = await prisma.oeuvre.create({
      data: {
        titre: validatedData.titre,
        description: validatedData.description,
        auteurId: authUser.id,
        categorieId: validatedData.categorieId,
        approuvee: authUser.role === Role.ADMIN, // Approuvée automatiquement si admin
        tags: validatedData.tags
          ? {
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
      },
    })

    return NextResponse.json(oeuvre, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}
