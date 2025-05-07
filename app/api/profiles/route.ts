import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireRole } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole(req, [Role.ADMIN])

    if (typeof user === "object" && "status" in user) {
      return user // C'est une réponse d'erreur, pas un utilisateur
    }

    const profiles = await prisma.profile.findMany()

    return NextResponse.json(profiles)
  } catch (error) {
    return handleError(error)
  }
}
