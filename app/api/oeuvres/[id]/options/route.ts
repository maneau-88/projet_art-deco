import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"
import { handleError } from "@/lib/error-handler"
import { optionPersonnalisationSchema } from "@/lib/validation"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const options = await prisma.optionPersonnalisation.findMany({
      where: { oeuvreId: params.id },
    })

    return NextResponse.json(options)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await requireAuth(req)

    if (typeof authUser === "object" && "status" in authUser) {
      return authUser // C'est une réponse d'erreur, pas un utilisateur
    }

    // Vérifier que l'œuvre existe et que l'utilisateur est l'auteur ou un admin
    const oeuvre = await prisma.oeuvre.findUnique({
      where: { id: params.id },
    })

    if (!oeuvre) {
      return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
    }

    if (oeuvre.auteurId !== authUser.id && authUser.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = optionPersonnalisationSchema.parse(body)

    // Créer l'option de personnalisation
    const option = await prisma.optionPersonnalisation.create({
      data: {
        nom: validatedData.nom,
        details: validatedData.details,
        oeuvreId: params.id,
      },
    })

    return NextResponse.json(option, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}
