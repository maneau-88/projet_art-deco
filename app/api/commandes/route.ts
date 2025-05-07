import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { commandeSchema } from "@/lib/validation"
import { Role, StatutCommande } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Filtrer les commandes selon le rôle de l'utilisateur
    let where = {}

    if (authUser.role === Role.CLIENT) {
      where = { clientId: authUser.id }
    } else if (authUser.role === Role.IMPRIMEUR) {
      where = { imprimeurId: authUser.id }
    } else if (authUser.role === Role.ARTISTE) {
      where = {
        elements: {
          some: {
            oeuvre: {
              auteurId: authUser.id,
            },
          },
        },
      }
    }
    // Les admins peuvent voir toutes les commandes

    const commandes = await prisma.commande.findMany({
      where,
      include: {
        client: {
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
        imprimeur: {
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
        elements: {
          include: {
            oeuvre: {
              select: {
                id: true,
                titre: true,
                auteurId: true,
              },
            },
          },
        },
        statutHistorique: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
        paiement: true,
        livraison: true,
      },
    })

    return NextResponse.json(commandes)
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

    const body = await req.json()
    const validatedData = commandeSchema.parse(body)

    // Vérifier que l'utilisateur est le client ou un admin
    if (validatedData.clientId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas créer une commande pour un autre utilisateur" },
        { status: 403 },
      )
    }

    // Créer la commande
    const commande = await prisma.commande.create({
      data: {
        clientId: validatedData.clientId,
        imprimeurId: validatedData.imprimeurId,
        elements: {
          create: validatedData.elements.map((element) => ({
            oeuvreId: element.oeuvreId,
            quantite: element.quantite,
          })),
        },
        statutHistorique: {
          create: {
            statut: StatutCommande.EN_ATTENTE,
          },
        },
      },
      include: {
        elements: {
          include: {
            oeuvre: true,
          },
        },
        statutHistorique: true,
      },
    })

    return NextResponse.json(commande, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}
