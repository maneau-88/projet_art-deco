import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Share2, ArrowLeft, Check } from "lucide-react"
import ArtworkCustomization from "@/components/artwork-customization"
import RelatedArtworks from "@/components/related-artworks"
import WallPreview from "@/components/wall-preview"

export const metadata: Metadata = {
  title: "Détail de l'œuvre | Art & Deco",
  description: "Découvrez et personnalisez cette œuvre d'art gabonaise pour votre décoration intérieure",
}

// Sample artwork data with Gabonese art
const artwork = {
  id: 1,
  title: "Masque Fang Ngil",
  artist: "Jean-Paul Ndong",
  price: 450,
  image: "/placeholder.svg?height=600&width=500",
  category: "Sculpture",
  style: "Traditionnel",
  description:
    "Ce masque Fang Ngil est une réinterprétation contemporaine des masques traditionnels utilisés dans les cérémonies du peuple Fang au Gabon. Avec ses traits distinctifs et sa finition soignée, cette œuvre apportera une touche d'authenticité africaine à votre intérieur tout en créant un point focal captivant.",
  dimensions: "40 x 20 x 15 cm",
  medium: "Bois d'ébène sculpté à la main",
  year: 2023,
  ethnie: "Fang",
  region: "Nord du Gabon",
  isNew: true,
  isAvailable: true,
}

export default function ArtworkDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8 md:py-12">
      <Link href="/gallery" className="mb-6 inline-flex items-center text-sm hover:text-primary-500">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la galerie
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Artwork Image */}
        <div className="relative">
          <div className="gold-frame aspect-[5/6] overflow-hidden rounded-lg">
            <div className="absolute inset-0 border-2 border-gold-500 m-2 z-10 pointer-events-none rounded-md"></div>
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              className="h-full w-full object-cover"
              width={500}
              height={600}
              priority
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm text-primary-500"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Ajouter aux favoris</span>
          </Button>
          {artwork.isNew && (
            <Badge className="absolute left-4 top-4 bg-secondary-500 hover:bg-secondary-500/90">Nouveau</Badge>
          )}
        </div>

        {/* Artwork Details */}
        <div className="flex flex-col">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-playfair text-3xl font-bold md:text-4xl">{artwork.title}</h1>
                <Link href={`/artist/${artwork.artist.toLowerCase().replace(" ", "-")}`}>
                  <p className="mt-1 text-lg text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
                </Link>
              </div>
              <p className="text-2xl font-bold">{artwork.price} €</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{artwork.category}</Badge>
              <Badge variant="outline">{artwork.style}</Badge>
              <Badge variant="outline">Ethnie {artwork.ethnie}</Badge>
              {artwork.isAvailable ? (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                >
                  <Check className="mr-1 h-3 w-3" /> Disponible
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                  Non disponible
                </Badge>
              )}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Description</h2>
                <p className="mt-2 text-muted-foreground">{artwork.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Dimensions</h3>
                  <p className="text-muted-foreground">{artwork.dimensions}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Matériau</h3>
                  <p className="text-muted-foreground">{artwork.medium}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Année</h3>
                  <p className="text-muted-foreground">{artwork.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Région</h3>
                  <p className="text-muted-foreground">{artwork.region}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="customize">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customize">Personnaliser</TabsTrigger>
                <TabsTrigger value="preview">Prévisualiser</TabsTrigger>
                <TabsTrigger value="wall">Simulation murale</TabsTrigger>
              </TabsList>
              <TabsContent value="customize" className="mt-6">
                <ArtworkCustomization />
              </TabsContent>
              <TabsContent value="preview" className="mt-6">
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Prévisualisation de l'œuvre dans un intérieur</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Visualisez comment cette œuvre gabonaise s'intégrera dans différents environnements. Utilisez les
                  options ci-dessous pour changer le style d'intérieur.
                </p>
              </TabsContent>
              <TabsContent value="wall" className="mt-6">
                <WallPreview
                  artworkImage={artwork.image}
                  artworkTitle={artwork.title}
                  artworkWidth={40}
                  artworkHeight={60}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="gap-2 bg-primary-500 hover:bg-primary-500/90">
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500/10"
                >
                  <Heart className="h-5 w-5" />
                  Favoris
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 border-accent-500 text-accent-500 hover:bg-accent-500/10"
                >
                  <Share2 className="h-5 w-5" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <RelatedArtworks />
    </div>
  )
}
