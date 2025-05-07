"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Package, Heart, Settings, CreditCard, User, Edit, Camera, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "@/app/actions/auth"

export default function AccountClientPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

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
          router.push("/login")
          return
        }

        setUser(session.user)

        // Récupérer le profil
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error("Erreur lors du chargement du profil:", profileError)
          toast({
            title: "Erreur",
            description: "Impossible de charger votre profil",
            variant: "destructive",
          })
        } else if (profileData) {
          setProfile(profileData)
        }

        // Simuler le chargement des favoris (à remplacer par une vraie requête)
        setFavorites([
          {
            id: 1,
            title: "Coucher de soleil sur l'Ogooué",
            artist: "Marie Nguema",
            price: 180,
            image: "/placeholder.svg?height=300&width=400",
          },
          {
            id: 2,
            title: "Masque Fang",
            artist: "Pierre Moussavou",
            price: 320,
            image: "/placeholder.svg?height=300&width=400",
          },
        ])

        // Simuler le chargement des commandes (à remplacer par une vraie requête)
        setOrders([
          {
            id: "ART-2023-001",
            date: "15 mars 2023",
            status: "Livré",
            items: [
              {
                title: "Paysage du Gabon",
                description: "Impression sur toile, 60x40cm",
                price: 120,
                image: "/placeholder.svg?height=64&width=64",
              },
            ],
          },
          {
            id: "ART-2023-002",
            date: "2 avril 2023",
            status: "En cours",
            items: [
              {
                title: "Sculpture traditionnelle",
                description: "Bois sculpté, 30cm",
                price: 250,
                image: "/placeholder.svg?height=64&width=64",
              },
            ],
          },
        ])
      } catch (error) {
        console.error("Erreur:", error)
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement de vos données",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router, supabase, toast])

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-lg">Chargement de votre profil...</div>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  // Extraire les initiales pour l'avatar
  const getInitials = () => {
    const firstName = profile.first_name || ""
    const lastName = profile.last_name || ""
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Mon Compte</h1>
        <p className="text-muted-foreground">Gérez votre profil, vos commandes et vos préférences</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profile.avatar_url || "/placeholder.svg?height=96&width=96"}
                      alt="Photo de profil"
                    />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Changer la photo</span>
                  </Button>
                </div>
                <CardTitle>
                  {profile.first_name} {profile.last_name}
                </CardTitle>
                <CardDescription>
                  Membre depuis{" "}
                  {new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="profile"
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto space-y-1">
                  <TabsTrigger value="profile" className="justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Commandes
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoris
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Paiement
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Gérez vos informations personnelles</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </CardHeader>
              <CardContent>
                <motion.div variants={itemVariants} className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" value={profile.first_name || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" value={profile.last_name || ""} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user.email || ""} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" value={profile.phone || ""} readOnly />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" value={profile.address || ""} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" value={profile.city || ""} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input id="postalCode" value={profile.postal_code || ""} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input id="country" value={profile.country || ""} readOnly />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
                <CardDescription>Historique et suivi de vos commandes</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <motion.div key={order.id} variants={itemVariants}>
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">Commande #{order.id}</CardTitle>
                              <Badge variant={order.status === "Livré" ? "default" : "outline"}>{order.status}</Badge>
                            </div>
                            <CardDescription>Commandé le {order.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            {order.items.map((item: any, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="h-16 w-16 rounded-md bg-muted relative overflow-hidden">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.title}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </div>
                                <p className="font-medium">{item.price} €</p>
                              </div>
                            ))}
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">
                              {order.status === "Livré" ? "Voir les détails" : "Suivre la livraison"}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Vous n'avez pas encore passé de commande</p>
                      <Button className="mt-4" onClick={() => router.push("/gallery")}>
                        Découvrir notre galerie
                      </Button>
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          )}

          {activeTab === "favorites" && (
            <Card>
              <CardHeader>
                <CardTitle>Mes favoris</CardTitle>
                <CardDescription>Œuvres que vous avez ajoutées à vos favoris</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                      <motion.div key={favorite.id} variants={itemVariants}>
                        <Card>
                          <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-lg">
                            <img
                              src={favorite.image || "/placeholder.svg"}
                              alt={favorite.title}
                              className="object-cover w-full h-full"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                              onClick={() => {
                                setFavorites(favorites.filter((fav) => fav.id !== favorite.id))
                                toast({
                                  title: "Retiré des favoris",
                                  description: "L'œuvre a été retirée de vos favoris",
                                })
                              }}
                            >
                              <Heart className="h-4 w-4 fill-primary-500 text-primary-500" />
                              <span className="sr-only">Retirer des favoris</span>
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium">{favorite.title}</h3>
                            <p className="text-sm text-muted-foreground">Par {favorite.artist}</p>
                            <p className="font-medium mt-2">{favorite.price} €</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                toast({
                                  title: "Ajouté au panier",
                                  description: `${favorite.title} a été ajouté à votre panier`,
                                })
                              }}
                            >
                              Ajouter au panier
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">Vous n'avez pas encore ajouté d'œuvres à vos favoris</p>
                      <Button className="mt-4" onClick={() => router.push("/gallery")}>
                        Découvrir notre galerie
                      </Button>
                    </div>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Moyens de paiement</CardTitle>
                <CardDescription>Gérez vos cartes et méthodes de paiement</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Carte Visa</CardTitle>
                          <Badge>Par défaut</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expire le 12/25</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm">
                          Supprimer
                        </Button>
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Ajouter un moyen de paiement
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>Gérez les paramètres de votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="space-y-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des emails concernant vos commandes et nos nouveautés
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Désactiver
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <Separator />

                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="language">Langue</Label>
                        <p className="text-sm text-muted-foreground">Choisissez la langue d'affichage du site</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          id="language"
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  <Separator />

                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <p className="text-sm text-muted-foreground">Modifiez votre mot de passe</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Changer
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <Separator />

                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-destructive">Supprimer le compte</Label>
                        <p className="text-sm text-muted-foreground">
                          Supprimer définitivement votre compte et toutes vos données
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="destructive" size="sm">
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
