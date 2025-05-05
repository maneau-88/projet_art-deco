import type { Metadata } from "next"
import AccountClientPage from "@/app/account/AccountClientPage"

export const metadata: Metadata = {
  title: "Mon Compte | Art & Deco",
  description: "Gérez votre compte, vos commandes et vos préférences sur Art & Deco",
}

export default function AccountPage() {
  return <AccountClientPage />
}
