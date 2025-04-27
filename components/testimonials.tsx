import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marie Koumba",
    role: "Cliente",
    content:
      "J'ai commandé un tableau représentant la forêt équatoriale gabonaise et le résultat est magnifique. La qualité d'impression est exceptionnelle et le cadre met parfaitement en valeur les couleurs vibrantes de l'œuvre.",
    rating: 5,
  },
  {
    name: "Thomas Moussavou",
    role: "Client",
    content:
      "Le processus de personnalisation est vraiment intuitif. J'ai pu visualiser comment le masque Punu que j'ai choisi s'intégrerait dans mon salon avant de finaliser ma commande.",
    rating: 5,
  },
  {
    name: "Claire Nzengue",
    role: "Artiste",
    content:
      "En tant qu'artiste gabonaise, Art & Deco m'a permis de toucher un public international et de collaborer directement avec mes clients pour créer des œuvres qui célèbrent notre culture.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="container py-12">
      <div className="mb-10 text-center">
        <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-info-500">Témoignages</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
          Découvrez ce que nos clients et artistes disent de leur expérience avec Art & Deco
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-info-500"></span>
          <span className="h-1 w-12 rounded-full bg-turquoise-500"></span>
          <span className="h-1 w-8 rounded-full bg-info-500"></span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const gradientClass =
            index === 0
              ? "bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border-t-2 border-t-primary-500"
              : index === 1
                ? "bg-gradient-to-br from-secondary-500/5 to-accent-500/5 border-t-2 border-t-secondary-500"
                : "bg-gradient-to-br from-accent-500/5 to-info-500/5 border-t-2 border-t-accent-500"

          return (
            <Card key={index} className={`overflow-hidden ${gradientClass}`}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-secondary-500 text-secondary-500" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full ${
                      index === 0
                        ? "bg-primary-500/20 text-primary-500"
                        : index === 1
                          ? "bg-secondary-500/20 text-secondary-500"
                          : "bg-accent-500/20 text-accent-500"
                    } flex items-center justify-center`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
