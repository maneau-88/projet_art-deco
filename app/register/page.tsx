"use client";
import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

//export const metadata: Metadata = {
  //title: "Inscription | Art & Deco",
  //description: "Créez votre compte Art & Deco",
//};

export default function RegisterPage() {
  // États pour gérer les entrées utilisateur
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Fonction d'inscription
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Vérification des champs
    if (!email || !password || !confirmPassword || !userType) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsRegistered(true);
    }
    
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <Image src="/logo.png" alt="Art & Deco" width={150} height={75} className="mx-auto" />
          <h1 className="mt-6 font-playfair text-2xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Rejoignez Art & Deco pour découvrir et personnaliser des œuvres d'art uniques.
          </p>
        </div>

        {isRegistered ? (
          <div className="text-center bg-green-100 p-4 rounded-md">
            <p className="text-green-700">Inscription réussie ! Un email de confirmation a été envoyé.</p>
            <Link href="/login">
              <Button className="mt-4">Se connecter</Button>
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Je suis</Label>
              <Select onValueChange={(value) => setUserType(value)}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Sélectionnez votre profil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="artist">Artiste</SelectItem>
                  <SelectItem value="printer">Imprimeur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-xs">
                J'accepte les{" "}
                <Link href="/terms" className="text-primary hover:underline">conditions générales</Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-primary hover:underline">politique de confidentialité</Link>
              </Label>
            </div>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <Button className="w-full bg-primary-500 hover:bg-primary-500/90" size="lg" type="submit" disabled={loading}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
