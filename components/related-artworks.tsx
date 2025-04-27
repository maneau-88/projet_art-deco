import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"

// Sample data for related artworks with Gabonese art
const relatedArtworks = [
  {
    id: 2,
    title: "Forêt Équatoriale",
    artist: "Marie Ogoula",
    price: 380,
    image: "/placeholder.svg?height=400&width=300",
    category: "Paysage",
    isNew: false,
  },
  {
    id: 3,
    title: "Cérémonie Bwiti",
    artist: "Pierre Akendengue",
    price: 520,
    image: "/placeholder.svg?height=400&width=300",
    category: "Peinture",
    isNew: true,
  },
  {
    id: 5,
    title: "Masque Blanc Punu",
    artist: "Claire Ayouma",
    price: 410,
    image: "/placeholder.svg?height=400&width=300",
    category: "Sculpture",
    isNew: false,
  },
  {
    id: 8,
    title: "Symboles Kota",
    artist: "Thomas Moussavou",
    price: 320,
    image: "/placeholder.svg?height=400&width=300",
    category: "Abstrait",
    isNew: true,
  },
]

export default function RelatedArtworks() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-bold">Autres œuvres gabonaises</h2>
        <Link href="/gallery">
          <Button variant="outline" className="gap-2 border-accent-500 text-accent-500 hover:bg-accent-500/10">
            Voir plus
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {relatedArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative">
              <Link href={`/artwork/${artwork.id}`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    width={300}
                    height={400}
                  />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>
              {artwork.isNew && <Badge className="absolute left-2 top-2 bg-secondary-500">Nouveau</Badge>}
            </div>
            <CardContent className="p-4">
              <Link href={`/artwork/${artwork.id}`}>
                <h3 className="font-playfair text-lg font-medium hover:text-primary-500">{artwork.title}</h3>
              </Link>
              <Link href={`/artist/${artwork.artist.toLowerCase().replace(" ", "-")}`}>
                <p className="text-sm text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
              </Link>
              <p className="mt-2 font-medium">{artwork.price} FCFA</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <Badge variant="outline">{artwork.category}</Badge>
              <Button size="sm" variant="ghost" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Ajouter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
