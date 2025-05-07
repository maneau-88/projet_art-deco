"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { filterArtworks } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface RelatedArtworksProps {
  categoryId?: string
  currentArtworkId?: number
}

export default function RelatedArtworks({ categoryId = "all", currentArtworkId }: RelatedArtworksProps) {
  const [relatedArtworks, setRelatedArtworks] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Obtenir les œuvres de la même catégorie, en excluant l'œuvre actuelle
    let filtered = filterArtworks({ category: categoryId })

    // Exclure l'œuvre actuelle
    if (currentArtworkId) {
      filtered = filtered.filter((artwork) => artwork.id !== currentArtworkId)
    }

    // Limiter à 4 œuvres
    setRelatedArtworks(filtered.slice(0, 4))
  }, [categoryId, currentArtworkId])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
      toast({
        title: "Retiré des favoris",
        description: "L'œuvre a été retirée de vos favoris",
      })
    } else {
      setFavorites([...favorites, id])
      toast({
        title: "Ajouté aux favoris",
        description: "L'œuvre a été ajoutée à vos favoris",
      })
    }
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold mb-6">Œuvres similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
                onClick={() => toggleFavorite(artwork.id)}
              >
                <Heart
                  className={`h-5 w-5 ${favorites.includes(artwork.id) ? "fill-primary-500 text-primary-500" : ""}`}
                />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>
              {artwork.isNew && <Badge className="absolute left-2 top-2 bg-secondary-500">Nouveau</Badge>}
            </div>
            <CardContent className="p-4">
              <Link href={`/artwork/${artwork.id}`}>
                <h3 className="font-playfair text-lg font-medium hover:text-primary-500">{artwork.title}</h3>
              </Link>
              <Link href={`/artist/${artwork.artist.toLowerCase().replace(/\s+/g, "-")}`}>
                <p className="text-sm text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
              </Link>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-medium">{artwork.price} €</p>
                <Badge variant="outline">{artwork.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
