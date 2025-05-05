"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserCircle, ShoppingCart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Galerie", href: "/gallery" },
    { name: "Artistes", href: "/artists" },
    { name: "Comment ça marche", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Art & Deco" width={120} height={60} priority />
          </Link>

          {isDesktop ? (
            <nav className="flex gap-6 ml-20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
            
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {isDesktop ? (
            <>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-accent-500 hover:text-accent-500/80 hover:bg-accent-500/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Panier</span>
                </Button>
              </Link>
              <Link href="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-accent-500 hover:text-accent-500/80 hover:bg-accent-500/10"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">Compte</span>
                </Button>
              </Link>
              <ModeToggle />
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-500 text-primary-500 hover:bg-primary-500/10"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary-500 hover:bg-primary-500/90">
                  Inscription
                </Button>
              </Link>
            </>
          ) : (
            <>
              <ModeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="grid gap-6 text-lg font-medium">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Panier
                    </Link>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCircle className="h-5 w-5" />
                      Compte
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Inscription</Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
