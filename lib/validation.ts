import { z } from "zod"
import { Role, StatutCommande } from "@prisma/client"

// Schémas de validation pour les utilisateurs
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(Role).optional(),
})

export const profileSchema = z.object({
  pseudo: z.string().min(3),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
})

export const premiumStatusSchema = z.object({
  subscribed: z.boolean().optional(),
  grantedByAdmin: z.boolean().optional(),
})

// Schémas pour les artistes et imprimeurs
export const artistProfileSchema = z.object({
  // Champs spécifiques aux artistes si nécessaire
})

export const printerProfileSchema = z.object({
  capabilities: z.array(z.string()).optional(),
})

export const impressionCapabilitySchema = z.object({
  name: z.string(),
})

// Schémas pour les catégories et tags
export const categorieSchema = z.object({
  nom: z.string(),
})

export const tagSchema = z.object({
  nom: z.string(),
})

// Schémas pour les œuvres et options
export const oeuvreSchema = z.object({
  titre: z.string(),
  description: z.string().optional(),
  categorieId: z.string(),
  tags: z.array(z.string()).optional(),
})

export const optionPersonnalisationSchema = z.object({
  nom: z.string(),
  details: z.string().optional(),
})

// Schémas pour les commandes
export const commandeSchema = z.object({
  clientId: z.string(),
  imprimeurId: z.string().optional(),
  elements: z.array(
    z.object({
      oeuvreId: z.string(),
      quantite: z.number().int().positive(),
    }),
  ),
})

export const statutCommandeSchema = z.object({
  statut: z.nativeEnum(StatutCommande),
})

export const paiementSchema = z.object({
  montant: z.number().positive(),
  methode: z.string(),
})

export const detailLivraisonSchema = z.object({
  adresse: z.string(),
  ville: z.string(),
  codePostal: z.string(),
  pays: z.string(),
})

// Schémas pour les notifications
export const notificationSchema = z.object({
  message: z.string(),
  userId: z.string(),
})

// Schéma pour les requêtes de génération d'image
export const generationImageRequestSchema = z.object({
  prompt: z.string(),
})
