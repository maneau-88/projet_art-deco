import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ArtistSpotlight() {
  return (
    <section className="container py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
            Artiste gabonais à <span className="text-secondary-500">l'honneur</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Découvrez le talent et l'univers de nos artistes du Gabon</p>
          <div className="mt-2 flex gap-2">
            <span className="h-1 w-10 rounded-full bg-primary-500"></span>
            <span className="h-1 w-14 rounded-full bg-secondary-500"></span>
          </div>
        </div>
        <Link href="/artists">
          <Button variant="outline" className="gap-2 border-primary-500 text-primary-500 hover:bg-primary-500/10">
            Tous les artistes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Jean-Paul Ndong"
            className="h-full w-full object-cover"
            width={600}
            height={600}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex gap-2">
              <span className="h-1 w-10 rounded-full bg-primary-500"></span>
              <span className="h-1 w-10 rounded-full bg-secondary-500"></span>
              <span className="h-1 w-10 rounded-full bg-accent-500"></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-playfair text-2xl font-bold md:text-3xl">
            Jean-Paul <span className="text-primary-500">Ndong</span>
          </h3>
          <p className="mt-2 text-muted-foreground">Sculpteur et peintre, Libreville</p>

          <div className="mt-6 space-y-4 border-l-4 border-l-accent-500 pl-4">
            <p>
              Jean-Paul Ndong est un artiste gabonais reconnu pour ses sculptures et peintures qui mêlent traditions
              ancestrales et expressions contemporaines. Son travail s'inspire profondément des masques Fang et des
              rituels Bwiti, qu'il réinterprète avec une sensibilité moderne.
            </p>
            <p>
              Formé à l'École Nationale d'Art de Libreville, Jean-Paul a développé un style distinctif qui célèbre
              l'héritage culturel gabonais tout en abordant des thématiques universelles. Ses œuvres ont été exposées
              dans plusieurs pays d'Afrique et d'Europe, et font partie de collections privées internationales.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/artist/jean-paul-ndong">
              <Button className="gap-2 bg-secondary-500 hover:bg-secondary-500/90">
                Voir le profil
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/gallery?artist=jean-paul-ndong">
              <Button variant="outline" className="border-accent-500 text-accent-500 hover:bg-accent-500/10">
                Voir les œuvres
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
