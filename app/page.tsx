"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Eye, 
  Clock, 
  Users, 
  CheckCircle2, 
  Play,
  Heart,
  TrendingUp,
  Youtube,
  Tv
} from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PlatformSection } from "@/components/platform-section"
import { MetricCard } from "@/components/metric-card"
import { AnimatedCounter } from "@/components/animated-counter"
import { Footer } from "@/components/footer"
import { getPortfolioData, defaultData, type PortfolioData } from "@/lib/store"

// Kick icon component
function KickIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 4h4v4H2V4zm4 4h4v4H6V8zm0 4H2v4h4v-4zm4-4h4v8h-4V8zm4-4h4v4h-4V4zm0 12h-4v4h4v-4zm4-4h4v4h-4v-4zm0-4h-4v4h4V8zm-4 8h4v4h-4v-4z"/>
    </svg>
  )
}

// TikTok icon component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

export default function HomePage() {
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setData(getPortfolioData())

    const handleStorageChange = () => {
      setData(getPortfolioData())
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection data={data.hero} />

      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* Kick Section */}
        <div className="mb-20">
          <PlatformSection 
            title="Metricas de Kick" 
            icon={<KickIcon className="h-6 w-6" />}
          >
            <MetricCard
              icon={<Eye className="h-5 w-5" />}
              label="Viewers de Media"
              value={<AnimatedCounter end={data.kick.viewers} suffix="" />}
              subtext="Espectadores simultaneos promedio"
              delay={0.1}
            />
            <MetricCard
              icon={<CheckCircle2 className="h-5 w-5 text-red-500" />}
              label="Partner Verificado"
              value={
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-semibold">Verificado</span>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              }
              subtext="Partner oficial de la plataforma"
              delay={0.2}
              glowColor="rgba(34, 197, 94, 0.3)"
            />
            <MetricCard
              icon={<Clock className="h-5 w-5" />}
              label="Horas Streameadas"
              value={<AnimatedCounter end={data.kick.hoursPerMonth} suffix="h" />}
              subtext="Por mes en promedio"
              delay={0.3}
            />
          </PlatformSection>
        </div>

        {/* YouTube Section */}
        <div className="mb-20">
          <PlatformSection 
            title="Metricas de YouTube" 
            icon={<Youtube className="h-6 w-6" />}
            gradient="from-red-500/10 to-transparent"
          >
            <MetricCard
              icon={<Play className="h-5 w-5" />}
              label="Vistas Totales"
              value={data.youtube.views}
              subtext="En los ultimos 365 dias"
              delay={0.1}
            />
            <MetricCard
              icon={<Clock className="h-5 w-5" />}
              label="Tiempo de Reproduccion"
              value={`${data.youtube.watchTime} horas`}
              subtext="Horas de contenido visto"
              delay={0.2}
            />
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              label="Suscriptores"
              value={`+${data.youtube.subscribers}`}
              subtext="Crecimiento continuo"
              delay={0.3}
            />
          </PlatformSection>

        </div>

        {/* TikTok Section */}
        <div className="mb-20">
          <PlatformSection 
            title="Metricas de TikTok" 
            icon={<TikTokIcon className="h-6 w-6" />}
            gradient="from-pink-500/10 to-transparent"
          >
            <MetricCard
              icon={<Heart className="h-5 w-5" />}
              label="Likes Totales"
              value={data.tiktok.likes}
              subtext="Interacciones de la comunidad"
              delay={0.1}
              glowColor="rgba(236, 72, 153, 0.3)"
            />
            <MetricCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Vistas Totales"
              value={data.tiktok.views}
              subtext="Alcance de contenido"
              delay={0.2}
              glowColor="rgba(236, 72, 153, 0.3)"
            />
          </PlatformSection>
        </div>

        {/* About Section */}
        <AboutSection data={data.about} />
      </div>

      <Footer links={data.socialLinks} />
    </main>
  )
}
