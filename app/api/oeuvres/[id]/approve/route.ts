import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { Role } from "@prisma/client"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireRole(req, [Role.ADMIN])

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const oeuvre = await prisma.oeuvre.findUnique({
      where: { id: params.id },
    })

    if (!oeuvre) {
      return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
    }

    // Approuver l'œuvre
    const approvedOeuvre = await prisma.oeuvre.update({
      where: { id: params.id },
      data: {
        approuvee: true,
        approbateurAdminId: authUser.id,
      },
    })

    // Créer une notification pour l'auteur
    await prisma.notification.create({
      data: {
        userId: oeuvre.auteurId,
        message: `Votre œuvre "${oeuvre.titre}" a été approuvée.`,
      },
    })

    return NextResponse.json({
      message: "Œuvre approuvée avec succès",
      oeuvre: approvedOeuvre,
    })
  } catch (error) {
    return handleError(error)
  }
}
