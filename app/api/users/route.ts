import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    // Vérifier que l'utilisateur est un administrateur
    const user = await requireRole(req, [Role.ADMIN])

    if (typeof user === "object" && "status" in user) {
      return user // C'est une réponse d'erreur, pas un utilisateur
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            pseudo: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    return handleError(error)
  }
}
