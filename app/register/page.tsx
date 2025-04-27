import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Inscription | Art & Deco",
  description: "Créez votre compte Art & Deco",
}

export default function RegisterPage() {
  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <Image src="/logo.png" alt="Art & Deco" width={150} height={75} className="mx-auto" />
          <h1 className="mt-6 font-playfair text-2xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Rejoignez Art & Deco pour découvrir et personnaliser des œuvres d'art uniques
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" placeholder="Prénom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" placeholder="Nom" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userType">Je suis</Label>
            <Select>
              <SelectTrigger id="userType">
                <SelectValue placeholder="Sélectionnez votre profil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Un client à la recherche d'œuvres d'art</SelectItem>
                <SelectItem value="artist">Un artiste souhaitant vendre mes œuvres</SelectItem>
                <SelectItem value="printer">Un imprimeur partenaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-xs">
              J'accepte les{" "}
              <Link href="/terms" className="text-primary hover:underline">
                conditions générales
              </Link>{" "}
              et la{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </Label>
          </div>
          <Button className="w-full bg-primary-500 hover:bg-primary-500/90" size="lg">
            S'inscrire
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <Separator className="w-full" />
          <span className="absolute bg-background px-2 text-xs text-muted-foreground">Ou continuer avec</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full border-info-500 text-info-500 hover:bg-info-500/10">
            Google
          </Button>
          <Button variant="outline" className="w-full border-primary-500 text-primary-500 hover:bg-primary-500/10">
            Facebook
          </Button>
        </div>

        <div className="text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-secondary-500 hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}
