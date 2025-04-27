import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Shield, Globe, Award, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "À propos | Art & Deco",
  description: "Découvrez notre mission, notre équipe et nos valeurs chez Art & Deco",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Section Hero */}
      <div className="mb-16 text-center">
        <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          À propos d'<span className="text-primary-500">Art & Deco</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Découvrez notre mission de valorisation de l'art gabonais et notre engagement envers les artistes et les
          amateurs d'art
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="h-1 w-16 rounded-full bg-primary-500"></span>
          <span className="h-1 w-10 rounded-full bg-secondary-500"></span>
          <span className="h-1 w-6 rounded-full bg-accent-500"></span>
        </div>
      </div>

      {/* Section Notre Mission */}
      <div className="mb-20 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Mission d'Art & Deco"
            className="h-full w-full object-cover"
            width={600}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex gap-2">
              <span className="h-1 w-10 rounded-full bg-primary-500"></span>
              <span className="h-1 w-10 rounded-full bg-secondary-500"></span>
              <span className="h-1 w-10 rounded-full bg-accent-500"></span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-playfair text-3xl font-bold">Notre mission</h2>
          <div className="mt-6 space-y-4">
            <p>
              Art & Deco est née d'une passion pour l'art gabonais et d'une volonté de créer un pont entre les artistes
              talentueux du Gabon et les amateurs d'art du monde entier. Notre mission est de valoriser et promouvoir le
              patrimoine artistique gabonais tout en offrant aux artistes une plateforme pour partager leur travail et
              développer leur carrière.
            </p>
            <p>
              Nous croyons fermement que l'art est un vecteur puissant de préservation culturelle et d'échange. À
              travers notre plateforme, nous souhaitons non seulement mettre en lumière la richesse et la diversité de
              l'art gabonais, mais aussi permettre à chacun de s'approprier ces œuvres et de les intégrer dans son
              quotidien.
            </p>
            <p>
              En facilitant l'accès à l'art gabonais et en proposant des services de personnalisation, nous espérons
              contribuer à la diffusion de cette culture unique et soutenir les artistes dans leur développement
              professionnel.
            </p>
          </div>
        </div>
      </div>

      {/* Section Nos Valeurs */}
      <div className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold">Nos valeurs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Les principes qui guident nos actions et notre engagement envers l'art gabonais
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary-500/10 p-3">
                <Heart className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="mb-2 font-medium">Passion pour l'art africain</h3>
              <p className="text-sm text-muted-foreground">
                Nous sommes animés par une passion profonde pour l'art gabonais et africain, et nous nous engageons à le
                faire connaître au monde entier.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-secondary-500/10 p-3">
                <Users className="h-6 w-6 text-secondary-500" />
              </div>
              <h3 className="mb-2 font-medium">Soutien aux artistes</h3>
              <p className="text-sm text-muted-foreground">
                Nous nous engageons à soutenir les artistes gabonais en leur offrant une plateforme équitable et des
                opportunités de développement.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-accent-500/10 p-3">
                <Award className="h-6 w-6 text-accent-500" />
              </div>
              <h3 className="mb-2 font-medium">Qualité et authenticité</h3>
              <p className="text-sm text-muted-foreground">
                Nous garantissons l'authenticité et la qualité de chaque œuvre proposée sur notre plateforme, dans le
                respect des traditions artistiques.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-info-500/10 p-3">
                <Globe className="h-6 w-6 text-info-500" />
              </div>
              <h3 className="mb-2 font-medium">Accessibilité culturelle</h3>
              <p className="text-sm text-muted-foreground">
                Nous rendons l'art gabonais accessible à tous, en proposant des œuvres variées et des informations
                culturelles enrichissantes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary-500/10 p-3">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="mb-2 font-medium">Éthique et transparence</h3>
              <p className="text-sm text-muted-foreground">
                Nous opérons avec intégrité et transparence dans toutes nos interactions avec les artistes, les clients
                et les partenaires.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section Notre Équipe */}
      <div className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold">Notre équipe</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Rencontrez les passionnés qui font vivre Art & Deco au quotidien
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Marie Koumba",
              role: "Fondatrice & Directrice",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Jean-Paul Ndong",
              role: "Directeur Artistique",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Sophie Ntsame",
              role: "Relations Artistes",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Thomas Moussavou",
              role: "Responsable Technique",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  width={300}
                  height={300}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-white/80">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Politique de Confidentialité */}
      <div className="mb-20">
        <div className="mb-10">
          <h2 className="font-playfair text-3xl font-bold">Politique de confidentialité</h2>
          <p className="mt-4 text-muted-foreground">
            Chez Art & Deco, nous accordons une grande importance à la protection de vos données personnelles
          </p>
          <Separator className="my-6" />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium">Collecte des données</h3>
            <p className="mt-2 text-muted-foreground">
              Nous collectons uniquement les informations nécessaires pour vous offrir la meilleure expérience possible
              sur notre plateforme. Ces informations peuvent inclure votre nom, adresse email, adresse de livraison et
              préférences artistiques. Toutes ces données sont collectées avec votre consentement explicite lors de la
              création de votre compte ou lors de vos achats.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Utilisation des données</h3>
            <p className="mt-2 text-muted-foreground">
              Les données que nous collectons sont utilisées pour traiter vos commandes, personnaliser votre expérience
              sur notre plateforme, vous informer sur nos nouveautés et améliorer nos services. Nous ne vendons jamais
              vos données personnelles à des tiers et ne les utilisons pas à des fins commerciales sans votre
              consentement.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Protection des données</h3>
            <p className="mt-2 text-muted-foreground">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données
              contre tout accès non autorisé, modification, divulgation ou destruction. Vos informations de paiement
              sont cryptées et traitées via des services de paiement sécurisés.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Vos droits</h3>
            <p className="mt-2 text-muted-foreground">
              Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification, de
              suppression et de portabilité de vos données personnelles. Vous pouvez exercer ces droits à tout moment en
              nous contactant via notre formulaire de contact ou par email à privacy@artanddeco.com.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Cookies et technologies similaires</h3>
            <p className="mt-2 text-muted-foreground">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Ces cookies nous permettent
              de mémoriser vos préférences, d'analyser le trafic sur notre site et de personnaliser notre contenu. Vous
              pouvez gérer vos préférences en matière de cookies à tout moment via les paramètres de votre navigateur.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-primary-500/10 p-8 text-center">
        <h2 className="font-playfair text-2xl font-bold">Vous avez des questions ?</h2>
        <p className="mx-auto mt-4 max-w-2xl">
          Notre équipe est à votre disposition pour répondre à toutes vos questions concernant notre plateforme, nos
          services ou notre politique de confidentialité.
        </p>
        <div className="mt-6">
          <Link href="/contact">
            <Button className="gap-2 bg-primary-500 hover:bg-primary-500/90">
              Contactez-nous
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
