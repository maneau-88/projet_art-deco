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



//export const metadata: Metadata = {
  //title: "Connexion | Art & Deco",
  //description: "Connectez-vous à votre compte Art & Deco",
//};

export default function LoginPage() {
  // États pour gérer les entrées utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction de connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      window.location.href = "/account"; // Redirection après connexion réussie
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-16">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <Image src="/logo.png" alt="Art & Deco" width={150} height={75} className="mx-auto" />
          <h1 className="mt-6 font-playfair text-2xl font-bold">Connexion</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <Button className="w-full bg-primary-500 hover:bg-primary-500/90" size="lg" type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center">
          <Separator className="w-full" />
          <span className="absolute bg-background px-2 text-xs text-muted-foreground">
            Ou continuer avec
          </span>
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
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="text-secondary-500 hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
