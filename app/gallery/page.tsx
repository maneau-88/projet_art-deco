"use client"

import { useState, useEffect } from "react"
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
import { artworks, filterArtworks, artists } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function GalleryPage() {
  // État pour les filtres
  const [category, setCategory] = useState("all")
  const [style, setStyle] = useState("all")
  const [artist, setArtist] = useState("all")
  const [ethnie, setEthnie] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [filteredArtworks, setFilteredArtworks] = useState(artworks)
  const [favorites, setFavorites] = useState<number[]>([])
  const { toast } = useToast()

  // Appliquer les filtres
  useEffect(() => {
    let filtered = filterArtworks({
      category: category,
      style: style,
      artist: artist,
      ethnie: ethnie,
      priceRange: priceRange,
    })

    // Appliquer la recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.artist.toLowerCase().includes(query) ||
          artwork.category.toLowerCase().includes(query) ||
          artwork.style.toLowerCase().includes(query),
      )
    }

    // Appliquer le tri
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popularity":
        // Ici on pourrait trier par popularité si on avait cette donnée
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredArtworks(filtered)
  }, [category, style, artist, ethnie, priceRange, searchQuery, sortBy])

  // Gérer les favoris
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

  // Ajouter au panier
  const addToCart = (artwork: any) => {
    toast({
      title: "Ajouté au panier",
      description: `${artwork.title} a été ajouté à votre panier`,
    })
  }

  // Extraire les ethnies uniques
  const uniqueEthnies = Array.from(new Set(artworks.map((artwork) => artwork.ethnie))).filter(Boolean) as string[]

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
        {/* Filtres */}
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-medium">Recherche</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-medium">Filtres</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm">Catégorie</label>
                <Select value={category} onValueChange={setCategory}>
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
                <Select value={style} onValueChange={setStyle}>
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
                <Select value={artist} onValueChange={setArtist}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les artistes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les artistes</SelectItem>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.name}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Ethnie</label>
                <Select value={ethnie} onValueChange={setEthnie}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les ethnies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les ethnies</SelectItem>
                    {uniqueEthnies.map((ethnie) => (
                      <SelectItem key={ethnie} value={ethnie}>
                        {ethnie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm">Prix (€)</label>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>{priceRange[0]} €</span>
                    <span>{priceRange[1]} €</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-accent-500 hover:bg-accent-500/90"
                onClick={() => {
                  setCategory("all")
                  setStyle("all")
                  setArtist("all")
                  setEthnie("all")
                  setPriceRange([0, 1000])
                  setSearchQuery("")
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="md:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Affichage de <strong>{filteredArtworks.length}</strong> œuvres
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
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

          <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="mb-6">
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
                {filteredArtworks.map((artwork) => (
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
                      <p className="mt-2 font-medium">{artwork.price} €</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <Badge variant="outline">{artwork.category}</Badge>
                      <Button size="sm" variant="ghost" className="gap-2" onClick={() => addToCart(artwork)}>
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
                {filteredArtworks.map((artwork) => (
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
                          onClick={() => toggleFavorite(artwork.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${favorites.includes(artwork.id) ? "fill-primary-500 text-primary-500" : ""}`}
                          />
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
                              <Link href={`/artist/${artwork.artist.toLowerCase().replace(/\s+/g, "-")}`}>
                                <p className="text-sm text-muted-foreground hover:text-primary-500">{artwork.artist}</p>
                              </Link>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline">{artwork.category}</Badge>
                                <Badge variant="outline">{artwork.style}</Badge>
                              </div>
                              <p className="mt-4 text-sm text-muted-foreground">
                                {artwork.description ? artwork.description.substring(0, 150) + "..." : ""}
                              </p>
                            </div>
                            <p className="text-xl font-medium">{artwork.price} €</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Link href={`/artwork/${artwork.id}`}>
                            <Button variant="outline" size="sm">
                              Voir les détails
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="gap-2 bg-primary-500 hover:bg-primary-500/90"
                            onClick={() => addToCart(artwork)}
                          >
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

          {filteredArtworks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium">Aucune œuvre ne correspond à vos critères</p>
              <p className="mt-2 text-muted-foreground">Essayez de modifier vos filtres pour voir plus de résultats</p>
              <Button
                onClick={() => {
                  setCategory("all")
                  setStyle("all")
                  setArtist("all")
                  setEthnie("all")
                  setPriceRange([0, 1000])
                  setSearchQuery("")
                }}
                className="mt-4 bg-primary-500 hover:bg-primary-500/90"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}

          {filteredArtworks.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}
