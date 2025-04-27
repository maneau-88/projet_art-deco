import { Card, CardContent } from "@/components/ui/card"
import { Search, Palette, Printer, Truck } from "lucide-react"

const steps = [
  {
    title: "Explorez",
    description: "Parcourez notre galerie d'œuvres d'art gabonais et trouvez celle qui vous inspire.",
    icon: Search,
    color: "primary",
  },
  {
    title: "Personnalisez",
    description: "Choisissez le format, le support et le cadre qui conviennent à votre intérieur et à l'œuvre.",
    icon: Palette,
    color: "secondary",
  },
  {
    title: "Commandez",
    description: "Validez votre commande et nos partenaires imprimeurs locaux se chargent de la production.",
    icon: Printer,
    color: "accent",
  },
  {
    title: "Recevez",
    description: "Votre œuvre d'art gabonaise personnalisée est livrée directement chez vous, prête à être exposée.",
    icon: Truck,
    color: "info",
  },
]

export default function HowItWorks() {
  return (
    <section className="container relative overflow-hidden py-12">
      {/* Decorative elements */}
      <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-primary-500/10"></div>
      <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-secondary-500/10"></div>
      <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-accent-500/10"></div>

      <div className="relative z-10">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
            Comment <span className="text-accent-500">ça marche</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Découvrez en quelques étapes simples comment Art & Deco vous permet d'acquérir des œuvres d'art gabonaises
            authentiques
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="h-1 w-12 rounded-full bg-primary-500"></span>
            <span className="h-1 w-12 rounded-full bg-secondary-500"></span>
            <span className="h-1 w-12 rounded-full bg-accent-500"></span>
            <span className="h-1 w-12 rounded-full bg-info-500"></span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const borderColor =
              step.color === "primary"
                ? "border-l-4 border-l-primary-500"
                : step.color === "secondary"
                  ? "border-l-4 border-l-secondary-500"
                  : step.color === "accent"
                    ? "border-l-4 border-l-accent-500"
                    : "border-l-4 border-l-info-500"

            const colorClass =
              step.color === "primary"
                ? "bg-primary-500/10 text-primary-500"
                : step.color === "secondary"
                  ? "bg-secondary-500/10 text-secondary-500"
                  : step.color === "accent"
                    ? "bg-accent-500/10 text-accent-500"
                    : "bg-info-500/10 text-info-500"

            return (
              <Card key={index} className={`relative overflow-hidden ${borderColor}`}>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-muted opacity-20"></div>
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${colorClass}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        step.color === "primary"
                          ? "bg-primary-500 text-white"
                          : step.color === "secondary"
                            ? "bg-secondary-500 text-white"
                            : step.color === "accent"
                              ? "bg-accent-500 text-white"
                              : "bg-info-500 text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-playfair text-xl font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
