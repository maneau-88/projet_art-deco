"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserCircle, ShoppingCart, LogOut } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/actions/auth"
import { useToast } from "@/hooks/use-toast"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Determine if scrolled past threshold
      if (currentScrollPos > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determine if should be visible based on scroll direction
      const isScrollingUp = prevScrollPos > currentScrollPos

      setVisible(isScrollingUp || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  // Charger les données de l'utilisateur
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true)

        // Récupérer la session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setUser(null)
          setProfile(null)
          return
        }

        setUser(session.user)

        // Récupérer le profil
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profileData) {
          setProfile(profileData)
        }
      } catch (error) {
        console.error("Erreur:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserData()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Gérer la déconnexion
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      })
    }
  }

  // Extraire les initiales pour l'avatar
  const getInitials = () => {
    if (!profile) return "AD"
    const firstName = profile.first_name || ""
    const lastName = profile.last_name || ""
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <AnimatePresence>
      <motion.header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-transparent",
        )}
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex h-16 items-center">
          <div className="flex items-center w-1/5">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/logo.png" alt="Art & Deco" width={140} height={70} priority />
              </motion.div>
            </Link>
          </div>

          <div className="flex justify-start w-3/5">
            <MainNav />
          </div>

          <div className="flex items-center justify-end w-1/5 gap-2">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative text-accent-500 hover:text-accent-500/80 hover:bg-accent-500/10"
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Panier</span>
                </Link>
              </Button>

              {!loading && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={profile?.avatar_url || "/placeholder.svg?height=32&width=32"}
                          alt="Photo de profil"
                        />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">Profil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=orders">Commandes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=favorites">Favoris</Link>
                    </DropdownMenuItem>
                    {profile?.user_type === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">Administration</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-accent-500 hover:text-accent-500/80 hover:bg-accent-500/10"
                >
                  <Link href="/account">
                    <UserCircle className="h-5 w-5" />
                    <span className="sr-only">Compte</span>
                  </Link>
                </Button>
              )}

              <ModeToggle />
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {!loading && !user ? (
                <>
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
              ) : null}
            </motion.div>
          </div>
        </div>
      </motion.header>
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16" />
    </AnimatePresence>
  )
}
