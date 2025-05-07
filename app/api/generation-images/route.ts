import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requirePremium } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { generationImageRequestSchema } from "@/lib/validation"

export async function GET(req: NextRequest) {
  try {
    const authUser = await requirePremium(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const imageRequests = await prisma.generationImageRequest.findMany({
      where: { userId: authUser.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(imageRequests)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requirePremium(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    const body = await req.json()
    const validatedData = generationImageRequestSchema.parse(body)

    // Créer la demande de génération d'image
    const imageRequest = await prisma.generationImageRequest.create({
      data: {
        userId: authUser.id,
        prompt: validatedData.prompt,
        // Le résultat sera mis à jour ultérieurement par un service de génération d'image
      },
    })

    // Ici, vous pourriez appeler un service externe de génération d'image
    // et mettre à jour le résultat via une requête PATCH ultérieure

    return NextResponse.json(imageRequest, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}
