import type { Metadata } from "next"
import CartClientPage from "./CartClientPage"

export const metadata: Metadata = {
  title: "Panier | Art & Deco",
  description: "Votre panier d'achats sur Art & Deco",
}

export default function CartPage() {
  return <CartClientPage />
}
