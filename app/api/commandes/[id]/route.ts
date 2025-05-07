import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth, requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const commande = await prisma.commande.findUnique({
      where: { id: params.id },
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
                auteur: {
                  select: {
                    profile: {
                      select: {
                        pseudo: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        statutHistorique: {
          orderBy: {
            date: "desc",
          },
        },
        paiement: true,
        livraison: true,
      },
    })

    if (!commande) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur a le droit de voir cette commande
    const isAuthorized =
      authUser.role === Role.ADMIN ||
      commande.clientId === authUser.id ||
      commande.imprimeurId === authUser.id ||
      commande.elements.some((element) => element.oeuvre.auteurId === authUser.id)

    if (!isAuthorized) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    return NextResponse.json(commande)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireRole(req, [Role.ADMIN])

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const commande = await prisma.commande.findUnique({
      where: { id: params.id },
    })

    if (!commande) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    // Supprimer la commande (uniquement par un admin)
    await prisma.commande.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Commande supprimée avec succès" })
  } catch (error) {
    return handleError(error)
  }
}
