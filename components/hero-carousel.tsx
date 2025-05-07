"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Images du carrousel représentant l'art gabonais
const carouselItems = [
  {
    id: 1,
    image: "/1er_image_carousel.jpg",
    title: "Art traditionnel gabonais",
    description: "Découvrez les masques et sculptures qui ont fait la renommée de l'art gabonais",
    link: "/gallery?category=sculpture",
  },
  {
    id: 2,
    image: "/beautiful-shot-pond-middle-forest (1).jpg",
    title: "Paysages du Gabon",
    description: "Explorez la beauté naturelle du Gabon à travers les œuvres de nos artistes",
    link: "/gallery?category=paysage",
  },
  {
    id: 3,
    image: "/ART_AFRICAIN_CONTEMPORAIN.jpg",
    title: "Art contemporain africain",
    description: "L'expression moderne des traditions ancestrales par nos artistes gabonais",
    link: "/gallery?category=contemporain",
  },
  {
    id: 4,
    image: "/PORTRAIT ET VIE DU GABON.jpg",
    title: "Portraits et scènes de vie",
    description: "La richesse culturelle gabonaise à travers ses habitants et leurs traditions",
    link: "/gallery?category=portrait",
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)

    // Réinitialiser l'état de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Correspond à la durée de transition CSS
  }, [isTransitioning])

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning])

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Démarrer le défilement automatique après quelques secondes
  useEffect(() => {
    const startAutoPlay = setTimeout(() => {
      if (isAutoPlaying) {
        const interval = setInterval(() => {
          goToNext()
        }, 9000) // Change d'image toutes les 9 secondes

        return () => clearInterval(interval)
      }
    }, 7000) // Commence après 7 secondes

    return () => clearTimeout(startAutoPlay)
  }, [goToNext, isAutoPlaying])

  // Arrêter le défilement automatique lorsque l'utilisateur interagit
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)

    // Reprendre après 30 secondes d'inactivité
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 30000)
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden" onMouseEnter={pauseAutoPlay}>
      {/* Overlay gradient */}
      

      {/* Carrousel d'images */}
      <div className="relative h-full w-full">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />

            {/* Contenu texte */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl bg-background/60 p-6 backdrop-blur-sm dark:bg-black/60 rounded-lg">
                  <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {item.title}
                  </h1>
                  <p className="mt-4 text-lg">{item.description}</p>
                  <div className="mt-6">
                    <Link href={item.link}>
                      <Button className="gap-2 bg-primary-500 hover:bg-primary-500/90">
                        Découvrir
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={() => {
          pauseAutoPlay()
          goToPrevious()
        }}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => {
          pauseAutoPlay()
          goToNext()
        }}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicateurs de position */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              pauseAutoPlay()
              goToSlide(index)
            }}
            className={cn(
              "h-2 w-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              index === currentIndex ? "bg-primary-500 w-12" : "bg-background/60 hover:bg-background/80",
            )}
            aria-label={`Aller à l'image ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
