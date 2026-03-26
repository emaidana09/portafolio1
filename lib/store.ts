"use client"

export interface PortfolioData {
  hero: {
    name: string
    title: string
    subtitle: string
  }
  about: {
    title: string
    subtitle: string
    description: string
  }
  kick: {
    viewers: number
    verified: boolean
    hoursPerMonth: number
  }
  youtube: {
    views: string
    watchTime: string
    subscribers: string
  }
  tiktok: {
    likes: string
    views: string
  }
  socialLinks: {
    github: string
    linkedin: string
  }
}

const defaultData: PortfolioData = {
  hero: {
    name: "Emiliano Maidana",
    title: "Content Creator & Dev",
    subtitle: "Streaming Partner | Ingenieria en Sistemas"
  },
  about: {
    title: "Sobre mi",
    subtitle: "Estudiante de Ingenieria en Sistemas | Content Strategist | Partner verificado en plataformas de streaming",
    description: "Soy un perfil hibrido de origen uruguayo, apasionado por la tecnologia y la creacion de contenido digital. Combino mi formacion academica en Sistemas con una trayectoria solida en el ecosistema del streaming, donde he logrado consolidar comunidades con una media de 70 espectadores simultaneos."
  },
  kick: {
    viewers: 60,
    verified: true,
    hoursPerMonth: 100
  },
  youtube: {
    views: "469.7k",
    watchTime: "3.0k",
    subscribers: "1k"
  },
  tiktok: {
    likes: "8k",
    views: "+200k"
  },
  socialLinks: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/"
  }
}

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData
  
  const stored = localStorage.getItem("portfolioData")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultData
    }
  }
  return defaultData
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return
  localStorage.setItem("portfolioData", JSON.stringify(data))
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("portfolioData")
}

export { defaultData }
