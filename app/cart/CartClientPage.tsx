"use client"

import { motion } from "framer-motion"
import { ShoppingCart, ArrowLeft, Trash2, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Données factices pour le panier
const cartItems = [
  {
    id: 1,
    title: "Paysage équatoriale",
    artist: "Jean Kouassi",
    price: 450000,
    quantity: 1,
    image: "/si-435781.jpg_ihcm-50.00_iwcm-50.00_fls-880229L.tif_fts-880229T.tif_mc-ffffff_fwcm-1.60_tmwcm-5.00_bmwcm-5.00_lmwcm-5.00_rmwcm-5.00_maxdim-1000_en_easyart___iar-1 (1).jpg",
    options: {
      size: "60x80cm",
      frame: "Cadre noir mat",
    },
  },
  {
    id: 2,
    title: "Masque traditionnel",
    artist: "Marie Ndong",
    price: 320000,
    quantity: 1,
    image: "/si-5485.jpg_ihcm-20.90_iwcm-26.17_fls-880229L.tif_fts-880229T.tif_mc-ffffff_fwcm-1.60_tmwcm-3.55_bmwcm-3.55_lmwcm-4.67_rmwcm-4.67_maxdim-1000_en_easyart___iar-1.jpg",
    options: {
      size: "Original",
      frame: "Sans cadre",
    },
  },
]

export default function CartClientPage() {
  // Calcul du sous-total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 25
  const total = subtotal + shipping

  return (
    <div className="container py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="h-6 w-6" />
          <h1 className="text-3xl font-playfair-display font-bold">Votre Panier</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">par {item.artist}</p>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  <p>Taille: {item.options.size}</p>
                                  <p>Cadre: {item.options.frame}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{item.price}FCFA</p>
                                <div className="flex items-center mt-2 space-x-2">
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Diminuer la quantité</span>
                                    <span>-</span>
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <span className="sr-only">Augmenter la quantité</span>
                                    <span>+</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Trash2 className="h-4 w-4 mr-1" />
                                <span>Supprimer</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/gallery">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continuer mes achats
                  </Link>
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Mettre à jour le panier
                </Button>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-medium mb-4">Résumé de la commande</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal}FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de livraison</span>
                      <span>{shipping}FCFA</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{total}FCFA</span>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full">Passer à la caisse</Button>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm mb-2">Code promo</p>
                      <div className="flex gap-2">
                        <Input placeholder="Entrez votre code" className="flex-1" />
                        <Button variant="outline">Appliquer</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-6">Découvrez notre galerie et ajoutez des œuvres à votre panier</p>
            <Button asChild>
              <Link href="/gallery">Parcourir la galerie</Link>
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
