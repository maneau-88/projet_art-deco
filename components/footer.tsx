import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background pt-8">
      <div className="container relative">
        {/* Decorative elements */}
        <div className="absolute -top-8 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-1 h-12 bg-secondary-500"></div>
        <div className="absolute top-0 right-1/4 w-1 h-12 bg-accent-500"></div>

        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Art & Deco" width={120} height={60} />
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Art & Deco est une plateforme qui connecte artistes, artisans et amateurs d'art pour une expérience de
              décoration intérieure personnalisée.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-primary transition-colors">
                  Artistes
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Newsletter</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Art & Deco. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
