import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { statutCommandeSchema } from "@/lib/validation"
import { Role, StatutCommande } from "@prisma/client"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const commande = await prisma.commande.findUnique({
      where: { id: params.id },
      include: {
        statutHistorique: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    })

    if (!commande) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    // Vérifier que l'utilisateur a le droit de modifier le statut
    const isAuthorized =
      authUser.role === Role.ADMIN ||
      (authUser.role === Role.IMPRIMEUR && commande.imprimeurId === authUser.id) ||
      (authUser.role === Role.CLIENT &&
        commande.clientId === authUser.id &&
        commande.statutHistorique[0]?.statut === StatutCommande.EN_ATTENTE) // Le client peut uniquement annuler une commande en attente

    if (!isAuthorized) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = statutCommandeSchema.parse(body)

    // Vérifier les transitions de statut valides
    const currentStatut = commande.statutHistorique[0]?.statut
    const newStatut = validatedData.statut

    // Règles de transition de statut
    const isValidTransition = () => {
      // Un admin peut faire n'importe quelle transition
      if (authUser.role === Role.ADMIN) return true

      // Un client ne peut qu'annuler une commande en attente
      if (authUser.role === Role.CLIENT) {
        return currentStatut === StatutCommande.EN_ATTENTE && newStatut === StatutCommande.ANNULEE
      }

      // Un imprimeur peut faire progresser la commande selon un flux logique
      if (authUser.role === Role.IMPRIMEUR) {
        const validTransitions: Record<StatutCommande, StatutCommande[]> = {
          [StatutCommande.EN_ATTENTE]: [StatutCommande.EN_COURS, StatutCommande.ANNULEE],
          [StatutCommande.EN_COURS]: [StatutCommande.EXPEDIEE],
          [StatutCommande.EXPEDIEE]: [StatutCommande.LIVREE],
          [StatutCommande.LIVREE]: [],
          [StatutCommande.ANNULEE]: [],
        }

        return validTransitions[currentStatut]?.includes(newStatut) || false
      }

      return false
    }

    if (!isValidTransition()) {
      return NextResponse.json({ error: "Transition de statut non autorisée" }, { status: 400 })
    }

    // Créer un nouvel historique de statut
    const newStatutHistorique = await prisma.statutCommandeHistorique.create({
      data: {
        commandeId: params.id,
        statut: newStatut,
      },
    })

    // Créer une notification pour le client
    await prisma.notification.create({
      data: {
        userId: commande.clientId,
        message: `Le statut de votre commande a été mis à jour : ${newStatut}`,
      },
    })

    return NextResponse.json({
      message: "Statut de la commande mis à jour avec succès",
      statut: newStatutHistorique,
    })
  } catch (error) {
    return handleError(error)
  }
}
