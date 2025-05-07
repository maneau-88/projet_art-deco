// Types pour les données
export type Artwork = {
    id: number
    title: string
    artist: string
    price: number
    image: string
    category: string
    style: string
    ethnie?: string
    region?: string
    description?: string
    dimensions?: string
    medium?: string
    year?: number
    isNew?: boolean
    isAvailable?: boolean
    featured?: boolean
  }
  
  export type Artist = {
    id: number
    name: string
    bio: string
    image: string
    region: string
    ethnie: string
    specialties: string[]
    featured?: boolean
  }
  
  // Données des œuvres d'art
  export const artworks: Artwork[] = [
    {
      id: 1,
      title: "Masque Fang Ngil",
      artist: "Jean-Paul Ndong",
      price: 450,
      image: "/placeholder.svg?height=400&width=300",
      category: "Sculpture",
      style: "Traditionnel",
      ethnie: "Fang",
      region: "Nord du Gabon",
      description:
        "Ce masque Fang Ngil est une réinterprétation contemporaine des masques traditionnels utilisés dans les cérémonies du peuple Fang au Gabon. Avec ses traits distinctifs et sa finition soignée, cette œuvre apportera une touche d'authenticité africaine à votre intérieur tout en créant un point focal captivant.",
      dimensions: "40 x 20 x 15 cm",
      medium: "Bois d'ébène sculpté à la main",
      year: 2023,
      isNew: true,
      isAvailable: true,
      featured: true,
    },
    {
      id: 2,
      title: "Forêt Équatoriale",
      artist: "Marie Ogoula",
      price: 380,
      image: "/placeholder.svg?height=400&width=300",
      category: "Paysage",
      style: "Contemporain",
      ethnie: "Myene",
      region: "Centre du Gabon",
      description:
        "Une représentation vibrante de la forêt équatoriale gabonaise, capturant la richesse de la biodiversité et la lumière filtrant à travers la canopée. Cette œuvre évoque la puissance et la sérénité de la nature.",
      dimensions: "60 x 80 cm",
      medium: "Acrylique sur toile",
      year: 2022,
      isNew: false,
      isAvailable: true,
    },
    {
      id: 3,
      title: "Cérémonie Bwiti",
      artist: "Pierre Akendengue",
      price: 520,
      image: "/placeholder.svg?height=400&width=300",
      category: "Peinture",
      style: "Traditionnel",
      ethnie: "Tsogo",
      region: "Sud du Gabon",
      description:
        "Cette œuvre captivante représente une cérémonie Bwiti, tradition spirituelle importante au Gabon. Les couleurs vives et les motifs symboliques racontent l'histoire de cette pratique ancestrale.",
      dimensions: "70 x 90 cm",
      medium: "Huile sur toile",
      year: 2023,
      isNew: true,
      isAvailable: true,
      featured: true,
    },
    {
      id: 4,
      title: "Femme Punu",
      artist: "Sophie Ntsame",
      price: 290,
      image: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      style: "Contemporain",
      ethnie: "Punu",
      region: "Sud-Ouest du Gabon",
      description:
        "Portrait expressif d'une femme Punu, capturant la dignité et la beauté des traditions. Les traits délicats et l'expression contemplative invitent à la réflexion sur l'identité culturelle.",
      dimensions: "50 x 60 cm",
      medium: "Techniques mixtes sur papier",
      year: 2021,
      isNew: false,
      isAvailable: true,
    },
    {
      id: 5,
      title: "Masque Blanc Punu",
      artist: "Claire Ayouma",
      price: 410,
      image: "/placeholder.svg?height=400&width=300",
      category: "Sculpture",
      style: "Traditionnel",
      ethnie: "Punu",
      region: "Sud du Gabon",
      description:
        "Réplique d'un masque blanc Punu, connu pour représenter l'idéal féminin de beauté. La finesse des traits et la blancheur symbolique en font une pièce d'exception pour les collectionneurs d'art africain.",
      dimensions: "30 x 15 x 10 cm",
      medium: "Bois peint à la main",
      year: 2020,
      isNew: false,
      isAvailable: true,
    },
    {
      id: 6,
      title: "Danseur Mukudji",
      artist: "Jean-Paul Ndong",
      price: 350,
      image: "/placeholder.svg?height=400&width=300",
      category: "Portrait",
      style: "Expressionniste",
      ethnie: "Punu",
      region: "Sud-Ouest du Gabon",
      description:
        "Cette œuvre dynamique capture l'énergie et le mouvement d'un danseur Mukudji lors d'une cérémonie traditionnelle. Les coups de pinceau expressifs transmettent la vitalité de cette danse ancestrale.",
      dimensions: "65 x 85 cm",
      medium: "Acrylique sur toile",
      year: 2023,
      isNew: true,
      isAvailable: true,
    },
    {
      id: 7,
      title: "Plage de Pointe Denis",
      artist: "Marie Ogoula",
      price: 480,
      image: "/placeholder.svg?height=400&width=300",
      category: "Paysage",
      style: "Impressionniste",
      ethnie: "Myene",
      region: "Côte Atlantique",
      description:
        "Une interprétation impressionniste de la célèbre plage de Pointe Denis, où les reflets du soleil dansent sur l'océan. Les touches de couleur évoquent la sensation de chaleur et de sérénité de ce lieu paradisiaque.",
      dimensions: "80 x 60 cm",
      medium: "Huile sur toile",
      year: 2022,
      isNew: false,
      isAvailable: true,
      featured: true,
    },
    {
      id: 8,
      title: "Symboles Kota",
      artist: "Thomas Moussavou",
      price: 320,
      image: "/placeholder.svg?height=400&width=300",
      category: "Abstrait",
      style: "Géométrique",
      ethnie: "Kota",
      region: "Est du Gabon",
      description:
        "Composition abstraite inspirée des motifs géométriques des figures de reliquaire Kota. L'œuvre réinterprète ces symboles ancestraux dans un langage contemporain tout en préservant leur essence spirituelle.",
      dimensions: "50 x 50 cm",
      medium: "Techniques mixtes sur bois",
      year: 2023,
      isNew: true,
      isAvailable: true,
    },
  ]
  
  // Données des artistes
  export const artists: Artist[] = [
    {
      id: 1,
      name: "Jean-Paul Ndong",
      bio: "Jean-Paul Ndong est un artiste gabonais reconnu pour ses sculptures et portraits expressifs qui mêlent traditions Fang et influences contemporaines. Formé à l'École des Beaux-Arts de Libreville, il explore les thèmes de l'identité culturelle et de la spiritualité.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Nord du Gabon",
      ethnie: "Fang",
      specialties: ["Sculpture", "Portrait", "Art traditionnel"],
      featured: true,
    },
    {
      id: 2,
      name: "Marie Ogoula",
      bio: "Marie Ogoula est une peintre paysagiste gabonaise dont les œuvres célèbrent la beauté naturelle de son pays. Ses tableaux impressionnistes capturent la lumière unique des forêts équatoriales et des côtes atlantiques du Gabon.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Centre du Gabon",
      ethnie: "Myene",
      specialties: ["Paysage", "Peinture impressionniste", "Art contemporain"],
      featured: true,
    },
    {
      id: 3,
      name: "Pierre Akendengue",
      bio: "Pierre Akendengue combine son héritage Tsogo avec des techniques picturales modernes pour créer des œuvres qui documentent les cérémonies et traditions spirituelles gabonaises. Son travail est une archive visuelle des pratiques culturelles en évolution.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Sud du Gabon",
      ethnie: "Tsogo",
      specialties: ["Peinture traditionnelle", "Art cérémoniel", "Documentation culturelle"],
    },
    {
      id: 4,
      name: "Sophie Ntsame",
      bio: "Sophie Ntsame est une artiste contemporaine spécialisée dans les portraits qui explorent l'identité féminine dans la culture Punu. Ses œuvres mêlent techniques traditionnelles et médiums modernes pour créer un dialogue entre passé et présent.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Sud-Ouest du Gabon",
      ethnie: "Punu",
      specialties: ["Portrait", "Art contemporain", "Techniques mixtes"],
    },
    {
      id: 5,
      name: "Claire Ayouma",
      bio: "Claire Ayouma est une sculptrice qui perpétue l'art des masques blancs Punu tout en y apportant sa sensibilité contemporaine. Son travail méticuleux préserve les techniques ancestrales tout en explorant de nouvelles interprétations.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Sud du Gabon",
      ethnie: "Punu",
      specialties: ["Sculpture", "Masques traditionnels", "Préservation culturelle"],
    },
    {
      id: 6,
      name: "Thomas Moussavou",
      bio: "Thomas Moussavou est un artiste abstrait qui s'inspire des motifs géométriques de l'art Kota. Ses compositions contemporaines transforment les symboles traditionnels en explorations visuelles qui transcendent les frontières culturelles.",
      image: "/placeholder.svg?height=300&width=300",
      region: "Est du Gabon",
      ethnie: "Kota",
      specialties: ["Art abstrait", "Art géométrique", "Réinterprétation culturelle"],
      featured: true,
    },
  ]
  
  // Fonctions utilitaires pour filtrer et récupérer les données
  export function getArtworkById(id: number): Artwork | undefined {
    return artworks.find((artwork) => artwork.id === id)
  }
  
  export function getArtistByName(name: string): Artist | undefined {
    return artists.find((artist) => artist.name.toLowerCase() === name.toLowerCase())
  }
  
  export function getArtworksByArtist(artistName: string): Artwork[] {
    return artworks.filter((artwork) => artwork.artist.toLowerCase() === artistName.toLowerCase())
  }
  
  export function getArtworksByCategory(category: string): Artwork[] {
    if (category === "all") return artworks
    return artworks.filter((artwork) => artwork.category.toLowerCase() === category.toLowerCase())
  }
  
  export function getArtworksByStyle(style: string): Artwork[] {
    if (style === "all") return artworks
    return artworks.filter((artwork) => artwork.style.toLowerCase() === style.toLowerCase())
  }
  
  export function getFeaturedArtworks(): Artwork[] {
    return artworks.filter((artwork) => artwork.featured)
  }
  
  export function getNewArtworks(): Artwork[] {
    return artworks.filter((artwork) => artwork.isNew)
  }
  
  export function getFeaturedArtists(): Artist[] {
    return artists.filter((artist) => artist.featured)
  }
  
  // Fonctions pour les filtres combinés
  export function filterArtworks(filters: {
    category?: string
    style?: string
    artist?: string
    ethnie?: string
    priceRange?: [number, number]
    isNew?: boolean
    featured?: boolean
  }): Artwork[] {
    return artworks.filter((artwork) => {
      // Filtre par catégorie
      if (
        filters.category &&
        filters.category !== "all" &&
        artwork.category.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false
      }
  
      // Filtre par style
      if (filters.style && filters.style !== "all" && artwork.style.toLowerCase() !== filters.style.toLowerCase()) {
        return false
      }
  
      // Filtre par artiste
      if (filters.artist && filters.artist !== "all" && artwork.artist.toLowerCase() !== filters.artist.toLowerCase()) {
        return false
      }
  
      // Filtre par ethnie
      if (filters.ethnie && filters.ethnie !== "all" && artwork.ethnie?.toLowerCase() !== filters.ethnie.toLowerCase()) {
        return false
      }
  
      // Filtre par fourchette de prix
      if (filters.priceRange && (artwork.price < filters.priceRange[0] || artwork.price > filters.priceRange[1])) {
        return false
      }
  
      // Filtre par nouveauté
      if (filters.isNew !== undefined && artwork.isNew !== filters.isNew) {
        return false
      }
  
      // Filtre par mise en avant
      if (filters.featured !== undefined && artwork.featured !== filters.featured) {
        return false
      }
  
      return true
    })
  }
  