"use client"

import { useState } from "react"
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

export default function AccountClientPage() {
  const [activeTab, setActiveTab] = useState("profile")

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
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Photo de profil" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Changer la photo</span>
                  </Button>
                </div>
                <CardTitle>Jean Dupont</CardTitle>
                <CardDescription>Membre depuis Janvier 2023</CardDescription>
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
              <Button variant="outline" className="w-full" size="sm">
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
                      <Input id="firstName" value="Jean" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" value="Dupont" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value="jean.dupont@example.com" readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" value="+33 6 12 34 56 78" readOnly />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" value="123 Rue de Paris" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" value="Paris" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input id="postalCode" value="75001" readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input id="country" value="France" readOnly />
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
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Commande #ART-2023-001</CardTitle>
                          <Badge>Livré</Badge>
                        </div>
                        <CardDescription>Commandé le 15 mars 2023</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md bg-muted relative overflow-hidden">
                              <img src="/placeholder.svg?height=64&width=64" alt="Tableau" className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Paysage du Gabon</p>
                              <p className="text-sm text-muted-foreground">Impression sur toile, 60x40cm</p>
                            </div>
                          </div>
                          <p className="font-medium">120 €</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Voir les détails
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Commande #ART-2023-002</CardTitle>
                          <Badge variant="outline">En cours</Badge>
                        </div>
                        <CardDescription>Commandé le 2 avril 2023</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md bg-muted relative overflow-hidden">
                              <img src="/placeholder.svg?height=64&width=64" alt="Sculpture" className="object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">Sculpture traditionnelle</p>
                              <p className="text-sm text-muted-foreground">Bois sculpté, 30cm</p>
                            </div>
                          </div>
                          <p className="font-medium">250 €</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          Suivre la livraison
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
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
                  <motion.div variants={itemVariants}>
                    <Card>
                      <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-lg">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Œuvre d'art"
                          className="object-cover w-full h-full"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                        >
                          <Heart className="h-4 w-4 fill-primary-500 text-primary-500" />
                          <span className="sr-only">Retirer des favoris</span>
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">Coucher de soleil sur l'Ogooué</h3>
                        <p className="text-sm text-muted-foreground">Par Marie Nguema</p>
                        <p className="font-medium mt-2">180 €</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button size="sm" className="w-full">
                          Ajouter au panier
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card>
                      <div className="aspect-[4/3] w-full relative overflow-hidden rounded-t-lg">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Œuvre d'art"
                          className="object-cover w-full h-full"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                        >
                          <Heart className="h-4 w-4 fill-primary-500 text-primary-500" />
                          <span className="sr-only">Retirer des favoris</span>
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">Masque Fang</h3>
                        <p className="text-sm text-muted-foreground">Par Pierre Moussavou</p>
                        <p className="font-medium mt-2">320 €</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button size="sm" className="w-full">
                          Ajouter au panier
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
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
