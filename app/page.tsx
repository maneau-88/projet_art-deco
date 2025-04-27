import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Palette, ImageIcon, Frame } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"
import FeaturedArtworks from "@/components/featured-artworks"
import ArtistSpotlight from "@/components/artist-spotlight"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Services Section */}
      <section className="container">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">Nos services</h2>
          <p className="mt-4 text-muted-foreground">
            Découvrez comment Art & Deco valorise l'art gabonais pour transformer votre espace de vie
          </p>
        </div>

        <Tabs defaultValue="artwork" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="artwork">Œuvres d'art</TabsTrigger>
            <TabsTrigger value="custom">Personnalisation</TabsTrigger>
            <TabsTrigger value="printing">Impression</TabsTrigger>
          </TabsList>
          <TabsContent value="artwork" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary-500/10 p-3">
                    <ImageIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Art authentique gabonais</h3>
                  <p className="text-sm text-muted-foreground">
                    Découvrez des œuvres uniques créées par des artistes talentueux du Gabon, reflétant la richesse
                    culturelle et artistique du pays.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-secondary-500/10 p-3">
                    <Palette className="h-6 w-6 text-secondary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Styles traditionnels et contemporains</h3>
                  <p className="text-sm text-muted-foreground">
                    Explorez une large gamme de styles artistiques, des masques traditionnels aux expressions
                    contemporaines de l'art gabonais.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-accent-500/10 p-3">
                    <Frame className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Qualité garantie</h3>
                  <p className="text-sm text-muted-foreground">
                    Chaque œuvre est vérifiée pour garantir une qualité exceptionnelle et l'authenticité de l'art
                    gabonais que vous achetez.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="custom" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary-500/10 p-3">
                    <Frame className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Cadres inspirés de l'artisanat local</h3>
                  <p className="text-sm text-muted-foreground">
                    Choisissez parmi une variété de cadres, dont certains inspirés des motifs traditionnels gabonais.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-secondary-500/10 p-3">
                    <ImageIcon className="h-6 w-6 text-secondary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Formats personnalisés</h3>
                  <p className="text-sm text-muted-foreground">
                    Adaptez les dimensions de votre œuvre pour qu'elle s'intègre parfaitement dans votre espace.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-accent-500/10 p-3">
                    <Palette className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Collaboration avec l'artiste</h3>
                  <p className="text-sm text-muted-foreground">
                    Échangez directement avec les artistes gabonais pour des ajustements personnalisés qui rendront
                    votre œuvre unique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="printing" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary-500/10 p-3">
                    <ImageIcon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Impression haute qualité</h3>
                  <p className="text-sm text-muted-foreground">
                    Nos partenaires imprimeurs utilisent des technologies de pointe pour des résultats qui respectent
                    les couleurs vibrantes de l'art africain.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-secondary-500/10 p-3">
                    <Palette className="h-6 w-6 text-secondary-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Variété de supports</h3>
                  <p className="text-sm text-muted-foreground">
                    Choisissez parmi différents supports d'impression : toile, papier fine art, tissus africains et plus
                    encore.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-accent-500/10 p-3">
                    <Frame className="h-6 w-6 text-accent-500" />
                  </div>
                  <h3 className="mb-2 font-medium">Finitions professionnelles</h3>
                  <p className="text-sm text-muted-foreground">
                    Des finitions soignées qui protègent votre œuvre et subliment les couleurs éclatantes de l'art
                    gabonais.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Artworks */}
      <FeaturedArtworks />

      {/* How It Works */}
      <HowItWorks />

      {/* Artist Spotlight */}
      <ArtistSpotlight />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section with more brand colors */}
      <section className="container">
        <div className="relative overflow-hidden rounded-lg bg-white p-8 shadow-lg dark:bg-black/20 md:p-12">
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary-500/20"></div>
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-secondary-500/20"></div>
          <div className="absolute bottom-12 right-12 h-24 w-24 rounded-full bg-accent-500/20"></div>
          <div className="absolute left-1/2 top-0 h-1 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
          <div className="relative z-10 text-center">
            <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à célébrer l'art <span className="text-primary-500">gabonais</span> chez vous ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Rejoignez Art & Deco dès aujourd'hui et découvrez comment l'art africain authentique peut transformer
              votre espace de vie et soutenir les artistes gabonais.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 bg-primary-500 hover:bg-primary-500/90">
                  Créer un compte
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary-500 text-secondary-500 hover:bg-secondary-500/10"
                >
                  Explorer la galerie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
