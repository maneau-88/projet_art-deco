import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Art & Deco",
  description: "Contactez l'équipe Art & Deco pour toute question ou demande de collaboration",
}

export default function ContactPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Contactez-<span className="text-primary-500">nous</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="h-1 w-16 rounded-full bg-primary-500"></span>
          <span className="h-1 w-10 rounded-full bg-secondary-500"></span>
          <span className="h-1 w-6 rounded-full bg-accent-500"></span>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="mb-16 grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-primary-500/10 p-3">
              <Mail className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="mb-2 font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">Pour toute question ou demande</p>
            <a href="mailto:contact@artanddeco.com" className="mt-2 font-medium text-primary-500 hover:underline">
              contact@artanddeco.com
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-secondary-500/10 p-3">
              <Phone className="h-6 w-6 text-secondary-500" />
            </div>
            <h3 className="mb-2 font-medium">Téléphone</h3>
            <p className="text-sm text-muted-foreground">Du lundi au vendredi, 9h-18h</p>
            <a href="tel:+24174123456" className="mt-2 font-medium text-secondary-500 hover:underline">
              +241 74 12 34 56
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="mb-4 rounded-full bg-accent-500/10 p-3">
              <MapPin className="h-6 w-6 text-accent-500" />
            </div>
            <h3 className="mb-2 font-medium">Adresse</h3>
            <p className="text-sm text-muted-foreground">Notre galerie à Libreville</p>
            <address className="mt-2 not-italic">
              <p className="font-medium text-accent-500">123 Boulevard du Bord de Mer</p>
              <p className="text-sm text-muted-foreground">Libreville, Gabon</p>
            </address>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form and Map Section */}
      <div className="grid gap-8 md:grid-cols-5">
        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <h2 className="font-playfair text-2xl font-bold">Envoyez-nous un message</h2>
            <p className="mt-2 text-muted-foreground">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
            </p>
          </div>

          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">
                <MessageSquare className="mr-2 h-4 w-4" />
                Général
              </TabsTrigger>
              <TabsTrigger value="artist">
                <User className="mr-2 h-4 w-4" />
                Artiste
              </TabsTrigger>
              <TabsTrigger value="business">
                <Users className="mr-2 h-4 w-4" />
                Professionnel
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Sujet
                </label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Demande d'information</SelectItem>
                    <SelectItem value="order">Question sur une commande</SelectItem>
                    <SelectItem value="support">Support technique</SelectItem>
                    <SelectItem value="feedback">Commentaires et suggestions</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Votre message..." className="min-h-[150px]" />
              </div>
              <Button className="w-full gap-2 bg-primary-500 hover:bg-primary-500/90">
                Envoyer le message
                <Send className="h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="artist" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="artist-name" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <Input id="artist-name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="artist-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="artist-email" type="email" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="specialty" className="text-sm font-medium">
                    Spécialité artistique
                  </label>
                  <Select>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Votre spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sculpture">Sculpture</SelectItem>
                      <SelectItem value="painting">Peinture</SelectItem>
                      <SelectItem value="mixed">Art mixte</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="abstract">Art abstrait</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-medium">
                    Années d'expérience
                  </label>
                  <Select>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Votre expérience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 ans</SelectItem>
                      <SelectItem value="3-5">3-5 ans</SelectItem>
                      <SelectItem value="6-10">6-10 ans</SelectItem>
                      <SelectItem value="10+">Plus de 10 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="portfolio" className="text-sm font-medium">
                  Lien vers votre portfolio (optionnel)
                </label>
                <Input id="portfolio" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label htmlFor="artist-message" className="text-sm font-medium">
                  Parlez-nous de votre art et de vos motivations
                </label>
                <Textarea id="artist-message" placeholder="Votre message..." className="min-h-[150px]" />
              </div>
              <Button className="w-full gap-2 bg-secondary-500 hover:bg-secondary-500/90">
                Soumettre ma candidature
                <Send className="h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="business" className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Nom de l'entreprise
                  </label>
                  <Input id="company-name" placeholder="Nom de votre entreprise" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-person" className="text-sm font-medium">
                    Personne de contact
                  </label>
                  <Input id="contact-person" placeholder="Nom et prénom" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="business-email" className="text-sm font-medium">
                    Email professionnel
                  </label>
                  <Input id="business-email" type="email" placeholder="contact@entreprise.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Téléphone
                  </label>
                  <Input id="phone" placeholder="+241 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="partnership-type" className="text-sm font-medium">
                  Type de partenariat
                </label>
                <Select>
                  <SelectTrigger id="partnership-type">
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallery">Galerie d'art</SelectItem>
                    <SelectItem value="printing">Service d'impression</SelectItem>
                    <SelectItem value="framing">Encadrement</SelectItem>
                    <SelectItem value="event">Organisation d'événements</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="business-message" className="text-sm font-medium">
                  Détails de votre proposition
                </label>
                <Textarea id="business-message" placeholder="Décrivez votre proposition..." className="min-h-[150px]" />
              </div>
              <Button className="w-full gap-2 bg-accent-500 hover:bg-accent-500/90">
                Envoyer la proposition
                <Send className="h-4 w-4" />
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Map and Hours */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <h2 className="font-playfair text-2xl font-bold">Nous trouver</h2>
            <p className="mt-2 text-muted-foreground">
              Visitez notre galerie à Libreville pour découvrir nos œuvres en personne
            </p>
          </div>

          <div className="mb-6 aspect-square overflow-hidden rounded-lg border bg-muted">
            {/* Ici, vous pourriez intégrer une carte Google Maps ou une autre carte */}
            <div className="flex h-full items-center justify-center bg-muted p-4 text-center text-muted-foreground">
              <div>
                <MapPin className="mx-auto h-8 w-8 text-primary-500" />
                <p className="mt-2">Carte interactive indisponible en prévisualisation</p>
                <p className="text-sm">123 Boulevard du Bord de Mer, Libreville, Gabon</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Horaires d'ouverture</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Lundi - Vendredi</span>
              </div>
              <p className="pl-6 text-sm text-muted-foreground">9h00 - 18h00</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Samedi</span>
              </div>
              <p className="pl-6 text-sm text-muted-foreground">10h00 - 16h00</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Dimanche</span>
              </div>
              <p className="pl-6 text-sm text-muted-foreground">Fermé</p>
            </div>

            <Separator className="my-4" />

            <div className="rounded-lg bg-primary-500/10 p-4">
              <h3 className="font-medium">Visites sur rendez-vous</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour une expérience personnalisée ou pour les groupes, nous proposons des visites guidées sur
                rendez-vous.
              </p>
              <Button variant="link" className="mt-2 p-0 text-primary-500 hover:text-primary-500/80">
                Réserver une visite
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="mb-10 text-center">
          <h2 className="font-playfair text-3xl font-bold">Questions fréquentes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Trouvez rapidement des réponses aux questions les plus courantes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              question: "Comment puis-je suivre ma commande ?",
              answer:
                "Une fois votre commande confirmée, vous recevrez un email avec un numéro de suivi. Vous pouvez également suivre votre commande en vous connectant à votre compte sur notre site.",
            },
            {
              question: "Quels sont les délais de livraison ?",
              answer:
                "Les délais de livraison varient en fonction de votre localisation. Pour le Gabon, comptez 3-5 jours ouvrables. Pour l'international, les délais sont généralement de 7-14 jours ouvrables.",
            },
            {
              question: "Comment puis-je devenir un artiste partenaire ?",
              answer:
                "Pour devenir un artiste partenaire, veuillez remplir le formulaire de contact en sélectionnant l'onglet 'Artiste'. Notre équipe examinera votre candidature et vous contactera pour discuter des prochaines étapes.",
            },
            {
              question: "Proposez-vous des services d'encadrement personnalisé ?",
              answer:
                "Oui, nous proposons une large gamme d'options d'encadrement personnalisé pour mettre en valeur votre œuvre d'art. Vous pouvez choisir parmi différents styles, matériaux et finitions.",
            },
          ].map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-playfair text-lg font-medium">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Vous ne trouvez pas la réponse à votre question ?{" "}
            <Link href="#contact-form" className="text-primary-500 hover:underline">
              Contactez-nous directement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
