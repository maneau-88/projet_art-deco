"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function ArtworkCustomization() {
  const [printType, setPrintType] = useState("canvas")
  const [frameType, setFrameType] = useState("none")
  const [size, setSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0])
  }

  const frameOptions = {
    none: { name: "Sans cadre", price: 0 },
    simple: { name: "Cadre simple", price: 40 },
    african: { name: "Cadre motifs africains", price: 80 },
    premium: { name: "Cadre bois exotique", price: 120 },
  }

  const printOptions = {
    canvas: { name: "Toile", price: 0 },
    paper: { name: "Papier Fine Art", price: -30 },
    fabric: { name: "Tissu africain", price: 50 },
    acrylic: { name: "Acrylique", price: 70 },
  }

  const sizeOptions = {
    small: { name: "Petit (40x50cm)", price: -50 },
    medium: { name: "Moyen (60x80cm)", price: 0 },
    large: { name: "Grand (80x100cm)", price: 100 },
    xlarge: { name: "Très grand (100x120cm)", price: 200 },
  }

  const basePrice = 450
  const totalPrice =
    (basePrice +
      frameOptions[frameType as keyof typeof frameOptions].price +
      printOptions[printType as keyof typeof printOptions].price +
      sizeOptions[size as keyof typeof sizeOptions].price) *
    quantity

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium text-accent-500">Type d'impression</h3>
        <RadioGroup value={printType} onValueChange={setPrintType} className="grid grid-cols-2 gap-4">
          {Object.entries(printOptions).map(([key, option]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={`print-${key}`} className="border-accent-500 text-accent-500" />
              <Label htmlFor={`print-${key}`} className="flex justify-between w-full">
                <span>{option.name}</span>
                <span className={`text-muted-foreground ${option.price > 0 ? "text-secondary-500" : ""}`}>
                  {option.price > 0 ? `+${option.price}FCFA` : option.price < 0 ? `${option.price}FCFA` : "Inclus"}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 font-medium text-primary-500">Taille</h3>
        <RadioGroup value={size} onValueChange={setSize} className="grid grid-cols-2 gap-4">
          {Object.entries(sizeOptions).map(([key, option]) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={`size-${key}`} className="border-primary-500 text-primary-500" />
              <Label htmlFor={`size-${key}`} className="flex justify-between w-full">
                <span>{option.name}</span>
                <span className={`text-muted-foreground ${option.price > 0 ? "text-secondary-500" : ""}`}>
                  {option.price > 0 ? `+${option.price}FCFA` : option.price < 0 ? `${option.price}FCFA` : "Inclus"}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-3 font-medium text-secondary-500">Cadre</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(frameOptions).map(([key, option]) => (
            <Button
              key={key}
              variant={frameType === key ? "default" : "outline"}
              className={`justify-between ${
                frameType === key
                  ? "bg-secondary-500 hover:bg-secondary-500/90"
                  : "border-secondary-500 text-secondary-500 hover:bg-secondary-500/10"
              }`}
              onClick={() => setFrameType(key)}
            >
              <span>{option.name}</span>
              <span className="text-xs">
                {option.price > 0 ? `+${option.price}FCFA` : option.price === 0 ? "Inclus" : `${option.price}FCFA`}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium text-info-500">Quantité: {quantity}</h3>
        <Slider
          defaultValue={[1]}
          max={10}
          step={1}
          min={1}
          onValueChange={handleQuantityChange}
          className="[&>span:first-child]:bg-info-500"
        />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-muted to-transparent"></div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Prix total</h3>
          <p className="text-sm text-muted-foreground">Impression, cadre et taille inclus</p>
        </div>
        <div className="text-2xl font-bold text-primary-500">{totalPrice} FCFA</div>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-accent-500">Demande spéciale</h3>
        <textarea
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Avez-vous des demandes particulières pour cette œuvre ? (retouches, effets spéciaux, etc.)"
        ></textarea>
      </div>
    </div>
  )
}
