"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowRight } from "lucide-react"

// Sample data for featured artworks with Gabonese art
const artworks = [
  {
    id: 1,
    title: "Masque Fang Ngil",
    artist: "Jean-Paul Ndong",
    price: 45000,
    image: "/Masque_fang.jpg",
    category: "Sculpture",
    isNew: true,
  },
  {
    id: 2,
    title: "Forêt Équatoriale",
    artist: "Marie Ogoula",
    price: 38000,
    image: "/beautiful-shot-pond-middle-forest (1).jpg",
    category: "Paysage",
    isNew: false,
  },
  {
    id: 3,
    title: "Cérémonie Bwiti",
    artist: "Pierre Akendengue",
    price: 52000,
    image: "/c3fb5c21190fee657c58132e3cacdf17-473714.jpg",
    category: "Peinture",
    isNew: true,
  },
  {
    id: 4,
    title: "Femme Punu",
    artist: "Sophie Ntsame",
    price: 29000,
    image: "/picasso.jpg",
    category: "Portrait",
    isNew: false,
  },
]

export default function FeaturedArtworks() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section className="container relative">
      {/* Decorative color elements */}
      <div className="absolute -left-4 -top-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-secondary-500/10 blur-3xl"></div>
      <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl"></div>

      {/* Main content */}
      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-primary-500">Art</span> gabonais en vedette
            </h2>
            <p className="mt-2 text-muted-foreground">
              Découvrez notre sélection d'œuvres exceptionnelles d'artistes gabonais
            </p>
            <div className="mt-2 flex gap-2">
              <span className="h-1 w-12 rounded-full bg-primary-500"></span>
              <span className="h-1 w-8 rounded-full bg-secondary-500"></span>
              <span className="h-1 w-6 rounded-full bg-accent-500"></span>
            </div>
          </div>
          <Link href="/gallery">
            <Button variant="outline" className="gap-2 border-accent-500 text-accent-500 hover:bg-accent-500/10">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className={`overflow-hidden transition-all hover:shadow-md ${
                artwork.id % 4 === 1
                  ? "border-t-4 border-t-primary-500"
                  : artwork.id % 4 === 2
                    ? "border-t-4 border-t-secondary-500"
                    : artwork.id % 4 === 3
                      ? "border-t-4 border-t-accent-500"
                      : "border-t-4 border-t-info-500"
              }`}
            >
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
                <Link href={`/artist/${artwork.artist.toLowerCase().replace(" ", "-")}`}>
                  <p className="text-sm text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
                </Link>
                <p className="mt-2 font-medium">{artwork.price} FCFA</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <Badge variant="outline">{artwork.category}</Badge>
                <Button size="sm" variant="ghost" className="gap-2 text-info-500 hover:text-info-500/80">
                  <ShoppingCart className="h-4 w-4" />
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
