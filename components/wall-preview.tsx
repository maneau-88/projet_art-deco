"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZoomIn, ZoomOut, Move, Download } from "lucide-react"

// Types d'environnements disponibles pour la prévisualisation
const environments = [
  { id: "living-room", name: "Salon", image: "/placeholder.svg?height=800&width=1200" },
  { id: "bedroom", name: "Chambre", image: "/placeholder.svg?height=800&width=1200" },
  { id: "office", name: "Bureau", image: "/placeholder.svg?height=800&width=1200" },
  { id: "dining-room", name: "Salle à manger", image: "/placeholder.svg?height=800&width=1200" },
]

// Types de murs disponibles
const wallTypes = [
  { id: "white", name: "Mur blanc", color: "#ffffff" },
  { id: "beige", name: "Mur beige", color: "#f5f5dc" },
  { id: "gray", name: "Mur gris", color: "#d3d3d3" },
  { id: "dark", name: "Mur foncé", color: "#555555" },
]

interface WallPreviewProps {
  artworkImage: string
  artworkTitle: string
  artworkWidth?: number // en cm
  artworkHeight?: number // en cm
}

export default function WallPreview({
  artworkImage,
  artworkTitle,
  artworkWidth = 60,
  artworkHeight = 80,
}: WallPreviewProps) {
  const [environment, setEnvironment] = useState(environments[0])
  const [wallType, setWallType] = useState(wallTypes[0])
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 50, y: 50 }) // Position en pourcentage
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculer la taille de l'œuvre en fonction de l'échelle et des dimensions réelles
  const artworkSize = {
    width: (artworkWidth / 100) * scale * 100, // Convertir en pixels relatifs
    height: (artworkHeight / 100) * scale * 100,
  }

  // Gérer le début du déplacement
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)

    if ("touches" in e) {
      // Événement tactile
      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      })
    } else {
      // Événement souris
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      })
    }
  }

  // Gérer le déplacement
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    let clientX, clientY

    if ("touches" in e) {
      // Événement tactile
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Événement souris
      clientX = e.clientX
      clientY = e.clientY
    }

    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    // Calculer le déplacement en pourcentage de la taille du conteneur
    const deltaX = ((clientX - dragStart.x) / rect.width) * 100
    const deltaY = ((clientY - dragStart.y) / rect.height) * 100

    // Mettre à jour la position en limitant aux bords du conteneur
    setPosition({
      x: Math.max(0, Math.min(100, position.x + deltaX)),
      y: Math.max(0, Math.min(100, position.y + deltaY)),
    })

    // Mettre à jour le point de départ pour le prochain mouvement
    setDragStart({
      x: clientX,
      y: clientY,
    })
  }

  // Gérer la fin du déplacement
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Ajouter les écouteurs d'événements pour le déplacement
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDrag)
      window.addEventListener("touchmove", handleDrag)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchend", handleDragEnd)
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag)
      window.removeEventListener("touchmove", handleDrag)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  // Fonction pour générer une image de prévisualisation (simulation)
  const generatePreview = () => {
    // Dans une implémentation réelle, cette fonction appellerait une API d'IA
    // pour générer une prévisualisation réaliste de l'œuvre dans l'environnement
    alert("Cette fonctionnalité utiliserait normalement une IA pour générer une prévisualisation réaliste.")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="environment">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="environment">Environnement</TabsTrigger>
          <TabsTrigger value="wall">Mur simple</TabsTrigger>
        </TabsList>

        <TabsContent value="environment" className="space-y-4">
          <div className="mt-4">
            <Select
              value={environment.id}
              onValueChange={(value) => setEnvironment(environments.find((env) => env.id === value) || environments[0])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un environnement" />
              </SelectTrigger>
              <SelectContent>
                {environments.map((env) => (
                  <SelectItem key={env.id} value={env.id}>
                    {env.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-video overflow-hidden rounded-lg border"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <Image src={environment.image || "/placeholder.svg"} alt={environment.name} fill className="object-cover" />

            <div
              className="absolute cursor-move"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${artworkSize.width}px`,
                height: `${artworkSize.height}px`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className="gold-frame h-full w-full overflow-hidden">
                <Image src={artworkImage || "/placeholder.svg"} alt={artworkTitle} fill className="object-cover" />
              </div>
            </div>
          </div>

          <Button onClick={generatePreview} className="w-full bg-accent-500 hover:bg-accent-500/90">
            Générer une prévisualisation IA
          </Button>
        </TabsContent>

        <TabsContent value="wall" className="space-y-4">
          <div className="mt-4">
            <Select
              value={wallType.id}
              onValueChange={(value) => setWallType(wallTypes.find((wall) => wall.id === value) || wallTypes[0])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un type de mur" />
              </SelectTrigger>
              <SelectContent>
                {wallTypes.map((wall) => (
                  <SelectItem key={wall.id} value={wall.id}>
                    {wall.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-video overflow-hidden rounded-lg border"
            style={{
              backgroundColor: wallType.color,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <div
              className="absolute cursor-move"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${artworkSize.width}px`,
                height: `${artworkSize.height}px`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className="gold-frame h-full w-full overflow-hidden">
                <Image src={artworkImage || "/placeholder.svg"} alt={artworkTitle} fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 -mb-6 flex justify-center">
                <div className="h-6 w-1 bg-black/20"></div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <Slider
              className="mx-2 w-32"
              value={[scale]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(value) => setScale(value[0])}
            />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Move className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline">Déplacer</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:inline">Enregistrer</span>
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Dimensions réelles: {artworkWidth} × {artworkHeight} cm
          </p>
          <p>Faites glisser l'œuvre pour la positionner sur le mur</p>
        </div>
      </div>
    </div>
  )
}
