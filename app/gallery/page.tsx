import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Heart, ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "Galerie | Art & Deco",
  description: "Explorez notre collection d'œuvres d'art gabonais pour votre décoration intérieure",
}

// Sample data for artworks with Gabonese art
const artworks = [
  {
    id: 1,
    title: "Masque Fang Ngil",
    artist: "Jean-Paul Ndong",
    price: 450,
    image: "/placeholder.svg?height=400&width=300",
    category: "Sculpture",
    style: "Traditionnel",
    isNew: true,
  },
  {
    id: 2,
    title: "Forêt Équatoriale",
    artist: "Marie Ogoula",
    price: 380,
    image: "/placeholder.svg?height=400&width=300",
    category: "Paysage",
    style: "Contemporain",
    isNew: false,
  },
  {
    id: 3,
    title: "Cérémonie Bwiti",
    artist: "Pierre Akendengue",
    price: 520,
    image: "/placeholder.svg?height=400&width=300",
    category: "Peinture",
    style: "Traditionnel",
    isNew: true,
  },
  {
    id: 4,
    title: "Femme Punu",
    artist: "Sophie Ntsame",
    price: 290,
    image: "/placeholder.svg?height=400&width=300",
    category: "Portrait",
    style: "Contemporain",
    isNew: false,
  },
  {
    id: 5,
    title: "Masque Blanc Punu",
    artist: "Claire Ayouma",
    price: 410,
    image: "/placeholder.svg?height=400&width=300",
    category: "Sculpture",
    style: "Traditionnel",
    isNew: false,
  },
  {
    id: 6,
    title: "Danseur Mukudji",
    artist: "Jean-Paul Ndong",
    price: 350,
    image: "/placeholder.svg?height=400&width=300",
    category: "Portrait",
    style: "Expressionniste",
    isNew: true,
  },
  {
    id: 7,
    title: "Plage de Pointe Denis",
    artist: "Marie Ogoula",
    price: 480,
    image: "/placeholder.svg?height=400&width=300",
    category: "Paysage",
    style: "Impressionniste",
    isNew: false,
  },
  {
    id: 8,
    title: "Symboles Kota",
    artist: "Thomas Moussavou",
    price: 320,
    image: "/placeholder.svg?height=400&width=300",
    category: "Abstrait",
    style: "Géométrique",
    isNew: true,
  },
]

export default function GalleryPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Galerie d'<span className="text-primary-500">art gabonais</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Explorez notre collection d'œuvres d'art gabonais authentiques et trouvez celle qui transformera votre
          intérieur
        </p>
        <div className="mt-2 flex gap-2">
          <span className="h-1 w-24 rounded-full bg-primary-500"></span>
          <span className="h-1 w-12 rounded-full bg-secondary-500"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filters */}
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-medium">Recherche</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-medium">Filtres</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm">Catégorie</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="sculpture">Sculpture</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="paysage">Paysage</SelectItem>
                    <SelectItem value="peinture">Peinture</SelectItem>
                    <SelectItem value="abstrait">Abstrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Style</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les styles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les styles</SelectItem>
                    <SelectItem value="traditionnel">Traditionnel</SelectItem>
                    <SelectItem value="contemporain">Contemporain</SelectItem>
                    <SelectItem value="expressionniste">Expressionniste</SelectItem>
                    <SelectItem value="impressionniste">Impressionniste</SelectItem>
                    <SelectItem value="geometrique">Géométrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Artiste</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les artistes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les artistes</SelectItem>
                    <SelectItem value="jean-paul-ndong">Jean-Paul Ndong</SelectItem>
                    <SelectItem value="marie-ogoula">Marie Ogoula</SelectItem>
                    <SelectItem value="pierre-akendengue">Pierre Akendengue</SelectItem>
                    <SelectItem value="sophie-ntsame">Sophie Ntsame</SelectItem>
                    <SelectItem value="claire-ayouma">Claire Ayouma</SelectItem>
                    <SelectItem value="thomas-moussavou">Thomas Moussavou</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Ethnie</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les ethnies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les ethnies</SelectItem>
                    <SelectItem value="fang">Fang</SelectItem>
                    <SelectItem value="punu">Punu</SelectItem>
                    <SelectItem value="myene">Myéné</SelectItem>
                    <SelectItem value="kota">Kota</SelectItem>
                    <SelectItem value="tsogo">Tsogo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Prix (FCFA)</label>
                <div className="px-2">
                  <Slider defaultValue={[0, 1000]} min={0} max={1000} step={10} />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>0 FCFA</span>
                    <span>1000 FCFA</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-accent-500 hover:bg-accent-500/90">
                <Filter className="mr-2 h-4 w-4" />
                Appliquer les filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="md:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Affichage de <strong>{artworks.length}</strong> œuvres
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="popularity">Popularité</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="grid" className="mb-6">
            <TabsList className="grid w-[200px] grid-cols-2 bg-muted hover:bg-muted">
              <TabsTrigger
                value="grid"
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-primary-foreground"
              >
                Grille
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-primary-500 data-[state=active]:text-primary-foreground"
              >
                Liste
              </TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artworks.map((artwork) => (
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
            </TabsContent>
            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {artworks.map((artwork) => (
                  <Card key={artwork.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-1/3">
                        <Link href={`/artwork/${artwork.id}`}>
                          <div className="aspect-[3/4] overflow-hidden md:aspect-square">
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
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <Link href={`/artwork/${artwork.id}`}>
                                <h3 className="font-playfair text-xl font-medium hover:text-primary-500">
                                  {artwork.title}
                                </h3>
                              </Link>
                              <Link href={`/artist/${artwork.artist.toLowerCase().replace(" ", "-")}`}>
                                <p className="text-sm text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
                              </Link>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline">{artwork.category}</Badge>
                                <Badge variant="outline">{artwork.style}</Badge>
                              </div>
                              <p className="mt-4 text-sm text-muted-foreground">
                                {artwork.category === "Sculpture"
                                  ? "Sculpture traditionnelle gabonaise représentant la richesse du patrimoine culturel et spirituel du pays."
                                  : artwork.category === "Paysage"
                                    ? "Représentation vibrante des paysages naturels du Gabon, entre forêt équatoriale et côtes atlantiques."
                                    : artwork.category === "Portrait"
                                      ? "Portrait expressif capturant l'essence et la dignité des peuples gabonais."
                                      : "Œuvre d'art gabonaise mêlant traditions ancestrales et expressions contemporaines."}
                              </p>
                            </div>
                            <p className="text-xl font-medium">{artwork.price} FCFA</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Link href={`/artwork/${artwork.id}`}>
                            <Button variant="outline" size="sm">
                              Voir les détails
                            </Button>
                          </Link>
                          <Button size="sm" className="gap-2 bg-primary-500 hover:bg-primary-500/90">
                            <ShoppingCart className="h-4 w-4" />
                            Ajouter au panier
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon" className="bg-primary-500 hover:bg-primary-500/90">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
