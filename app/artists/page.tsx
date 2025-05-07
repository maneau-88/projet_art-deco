import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, MapPin, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Artistes | Art & Deco",
  description: "Découvrez les artistes gabonais talentueux qui collaborent avec Art & Deco",
}

// Données des artistes (à remplacer par des données réelles)
const artists = [
  {
    id: 1,
    name: "Jean-Paul Ndong",
    image: "/ART_AFRICAIN_CONTEMPORAIN.jpg",
    specialty: "Sculpture",
    region: "Libreville",
    bio: "Jean-Paul Ndong est un artiste gabonais reconnu pour ses sculptures et peintures qui mêlent traditions ancestrales et expressions contemporaines. Son travail s'inspire profondément des masques Fang et des rituels Bwiti.",
    featured: true,
    artworks: 12,
    awards: 3,
  },
  {
    id: 2,
    name: "Marie Ogoula",
    image: "/bmi-2_bmwcm-2.0_fid-880229_fwcm-1.6_ihcm-61.0_iwcm-61.0_lmwcm-2.0_maxdim-1000_mc-ffffff_rmwcm-2.0_si-472379.jpg_tmwcm-2.0.jpg",
    specialty: "Peinture",
    region: "Port-Gentil",
    bio: "Marie Ogoula capture la beauté naturelle du Gabon à travers ses peintures vibrantes. Ses œuvres représentent souvent les paysages côtiers et la forêt équatoriale avec une palette de couleurs éclatantes.",
    featured: true,
    artworks: 18,
    awards: 2,
  },
  {
    id: 3,
    name: "Pierre Akendengue",
    image: "/bmi-2_bmwcm-2.0_fid-880610_fwcm-1.9_ihcm-90.0_iwcm-62.5_lmwcm-2.0_maxdim-1000_mc-ffffff_rmwcm-2.0_si-473062.jpg_tmwcm-2.0.jpg",
    specialty: "Art mixte",
    region: "Franceville",
    bio: "Pierre Akendengue est un artiste polyvalent qui combine différentes techniques pour créer des œuvres uniques. Son art est fortement influencé par les cérémonies traditionnelles et la spiritualité gabonaise.",
    featured: false,
    artworks: 9,
    awards: 1,
  },
  {
    id: 4,
    name: "Sophie Ntsame",
    image: "/si-435781.jpg_ihcm-50.00_iwcm-50.00_fls-880229L.tif_fts-880229T.tif_mc-ffffff_fwcm-1.60_tmwcm-5.00_bmwcm-5.00_lmwcm-5.00_rmwcm-5.00_maxdim-1000_en_easyart___iar-1 (1).jpg",
    specialty: "Portrait",
    region: "Oyem",
    bio: "Sophie Ntsame est spécialisée dans les portraits expressifs qui capturent l'essence et la dignité des peuples gabonais. Son style unique mêle réalisme et touches abstraites pour des œuvres saisissantes.",
    featured: true,
    artworks: 15,
    awards: 2,
  },
  {
    id: 5,
    name: "Thomas Moussavou",
    image: "/c3fb5c21190fee657c58132e3cacdf17-473714.jpg",
    specialty: "Art abstrait",
    region: "Lambaréné",
    bio: "Thomas Moussavou explore l'art abstrait inspiré des symboles et motifs traditionnels Kota. Ses compositions géométriques colorées créent un pont entre l'héritage culturel gabonais et l'art contemporain.",
    featured: false,
    artworks: 11,
    awards: 1,
  },
  {
    id: 6,
    name: "Claire Ayouma",
    image: "/nature.jpg",
    specialty: "Sculpture",
    region: "Mouila",
    bio: "Claire Ayouma est connue pour ses sculptures délicates qui représentent souvent des figures féminines et des masques Punu. Son travail célèbre la beauté et la force des femmes gabonaises.",
    featured: false,
    artworks: 7,
    awards: 2,
  },
]

export default function ArtistsPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Nos <span className="text-primary-500">Artistes</span> Gabonais
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Découvrez les talents exceptionnels qui donnent vie à l'art gabonais contemporain et traditionnel
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="h-1 w-16 rounded-full bg-primary-500"></span>
          <span className="h-1 w-10 rounded-full bg-secondary-500"></span>
          <span className="h-1 w-6 rounded-full bg-accent-500"></span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-10 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Rechercher un artiste
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="search" placeholder="Nom de l'artiste..." className="pl-10" />
            </div>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label htmlFor="specialty" className="text-sm font-medium">
              Spécialité
            </label>
            <Select>
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="painting">Peinture</SelectItem>
                <SelectItem value="mixed">Art mixte</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="abstract">Art abstrait</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48 space-y-2">
            <label htmlFor="region" className="text-sm font-medium">
              Région
            </label>
            <Select>
              <SelectTrigger id="region">
                <SelectValue placeholder="Toutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="libreville">Libreville</SelectItem>
                <SelectItem value="port-gentil">Port-Gentil</SelectItem>
                <SelectItem value="franceville">Franceville</SelectItem>
                <SelectItem value="oyem">Oyem</SelectItem>
                <SelectItem value="lambarene">Lambaréné</SelectItem>
                <SelectItem value="mouila">Mouila</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-primary-500 hover:bg-primary-500/90">Filtrer</Button>
        </div>
      </div>

      {/* Artists Tabs */}
      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="grid">Grille</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>
          <p className="text-sm text-muted-foreground">{artists.length} artistes trouvés</p>
        </div>

        {/* Grid View */}
        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    width={400}
                    height={400}
                  />
                  {artist.featured && (
                    <Badge className="absolute left-3 top-3 bg-secondary-500">Artiste en vedette</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-playfair text-xl font-medium">{artist.name}</h3>
                    <Badge variant="outline">{artist.specialty}</Badge>
                  </div>
                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {artist.region}
                    {artist.awards > 0 && (
                      <span className="ml-4 flex items-center">
                        <Award className="mr-1 h-4 w-4 text-secondary-500" />
                        {artist.awards} prix
                      </span>
                    )}
                  </div>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{artist.bio}</p>
                  <div className="flex justify-between">
                    <span className="text-sm">{artist.artworks} œuvres</span>
                    <Link href={`/artist/${artist.id}`}>
                      <Button variant="link" className="p-0 text-primary-500 hover:text-primary-500/80">
                        Voir le profil
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="mt-6">
          <div className="space-y-6">
            {artists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/4">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        width={400}
                        height={400}
                      />
                    </div>
                    {artist.featured && (
                      <Badge className="absolute left-3 top-3 bg-secondary-500">Artiste en vedette</Badge>
                    )}
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-playfair text-2xl font-medium">{artist.name}</h3>
                      <Badge variant="outline">{artist.specialty}</Badge>
                    </div>
                    <div className="mb-4 flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {artist.region}
                      {artist.awards > 0 && (
                        <span className="ml-4 flex items-center">
                          <Award className="mr-1 h-4 w-4 text-secondary-500" />
                          {artist.awards} prix
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-muted-foreground">{artist.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span>{artist.artworks} œuvres</span>
                        <Link href={`/gallery?artist=${artist.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-accent-500 text-accent-500 hover:bg-accent-500/10"
                          >
                            Voir les œuvres
                          </Button>
                        </Link>
                      </div>
                      <Link href={`/artist/${artist.id}`}>
                        <Button className="gap-2 bg-primary-500 hover:bg-primary-500/90">
                          Voir le profil
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Artist Section */}
      <div className="mt-20">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold">Devenir un artiste partenaire</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Vous êtes un artiste gabonais et souhaitez rejoindre notre plateforme ? Nous sommes toujours à la recherche
            de nouveaux talents pour enrichir notre collection.
          </p>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 p-8 text-center">
          <h3 className="font-playfair text-2xl font-medium">Partagez votre art avec le monde</h3>
          <p className="mx-auto mt-4 max-w-2xl">
            Rejoignez Art & Deco pour bénéficier d'une visibilité internationale, d'un accompagnement personnalisé et
            d'opportunités de vente pour vos œuvres.
          </p>
          <div className="mt-6">
            <Link href="/contact?subject=devenir-artiste">
              <Button size="lg" className="gap-2 bg-secondary-500 hover:bg-secondary-500/90">
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
