import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth, requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { premiumStatusSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const premiumStatus = await prisma.premiumStatus.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!premiumStatus) {
      return NextResponse.json({ error: "Statut premium non trouvé" }, { status: 404 })
    }

    // Vérifier que l'utilisateur consulte son propre statut ou est un admin
    if (premiumStatus.userId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    return NextResponse.json(premiumStatus)
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

    const premiumStatus = await prisma.premiumStatus.findUnique({
      where: { id: params.id },
    })

    if (!premiumStatus) {
      return NextResponse.json({ error: "Statut premium non trouvé" }, { status: 404 })
    }

    const body = await req.json()
    const validatedData = premiumStatusSchema.parse(body)

    const updatedPremiumStatus = await prisma.premiumStatus.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(updatedPremiumStatus)
  } catch (error) {
    return handleError(error)
  }
}
