"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Save, 
  RotateCcw, 
  ArrowLeft, 
  Settings,
  User,
  Youtube,
  Link2,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  getPortfolioData, 
  savePortfolioData, 
  resetPortfolioData, 
  defaultData,
  type PortfolioData 
} from "@/lib/store"
import { toast } from "sonner"
import { Toaster } from "sonner"

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

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [mounted, setMounted] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setMounted(true)
    setData(getPortfolioData())
  }, [])

  const handleSave = () => {
    setSaving(true)
    savePortfolioData(data)
    
    // Dispatch storage event for other tabs
    window.dispatchEvent(new Event("storage"))
    
    setTimeout(() => {
      setSaving(false)
      toast.success("Cambios guardados correctamente")
    }, 500)
  }

  const handleReset = () => {
    if (confirm("Estas seguro de que quieres restablecer todos los datos?")) {
      resetPortfolioData()
      setData(defaultData)
      window.dispatchEvent(new Event("storage"))
      toast.info("Datos restablecidos")
    }
  }

  const updateData = <K extends keyof PortfolioData>(
    section: K,
    field: keyof PortfolioData[K],
    value: PortfolioData[K][keyof PortfolioData[K]]
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Volver</span>
              </a>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <h1 className="font-space text-lg font-bold text-foreground">Panel de Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="/" 
                target="_blank"
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Ver sitio</span>
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Restablecer</span>
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Tabs defaultValue="hero" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 gap-2 bg-secondary p-1 sm:grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Hero
              </TabsTrigger>
              <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sobre Mi
              </TabsTrigger>
              <TabsTrigger value="kick" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Kick
              </TabsTrigger>
              <TabsTrigger value="youtube" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                YouTube
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                TikTok
              </TabsTrigger>
              <TabsTrigger value="links" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Links
              </TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5 text-primary" />
                      Seccion Hero
                    </CardTitle>
                    <CardDescription>
                      Personaliza el encabezado principal de tu portafolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="hero-name">Nombre / Titulo Principal</Label>
                      <Input
                        id="hero-name"
                        value={data.hero.name}
                        onChange={(e) => updateData("hero", "name", e.target.value)}
                        placeholder="Tu nombre o titulo"
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-title">Subtitulo</Label>
                      <Input
                        id="hero-title"
                        value={data.hero.title}
                        onChange={(e) => updateData("hero", "title", e.target.value)}
                        placeholder="Tu rol o especialidad"
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hero-subtitle">Descripcion corta</Label>
                      <Input
                        id="hero-subtitle"
                        value={data.hero.subtitle}
                        onChange={(e) => updateData("hero", "subtitle", e.target.value)}
                        placeholder="Una linea sobre ti"
                        className="bg-secondary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* About Section */}
            <TabsContent value="about">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5 text-primary" />
                      Sobre Mi
                    </CardTitle>
                    <CardDescription>
                      Cuenta tu historia y experiencia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="about-title">Titulo de la seccion</Label>
                      <Input
                        id="about-title"
                        value={data.about.title}
                        onChange={(e) => updateData("about", "title", e.target.value)}
                        placeholder="Sobre mi"
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about-subtitle">Subtitulo / Roles</Label>
                      <Input
                        id="about-subtitle"
                        value={data.about.subtitle}
                        onChange={(e) => updateData("about", "subtitle", e.target.value)}
                        placeholder="Tus roles y especialidades"
                        className="bg-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about-description">Descripcion completa</Label>
                      <Textarea
                        id="about-description"
                        value={data.about.description}
                        onChange={(e) => updateData("about", "description", e.target.value)}
                        placeholder="Cuenta tu historia..."
                        rows={5}
                        className="bg-secondary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Kick Section */}
            <TabsContent value="kick">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <KickIcon className="h-5 w-5 text-primary" />
                      Metricas de Kick
                    </CardTitle>
                    <CardDescription>
                      Actualiza tus estadisticas de Kick
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="kick-viewers">Viewers de Media</Label>
                        <Input
                          id="kick-viewers"
                          type="number"
                          value={data.kick.viewers}
                          onChange={(e) => updateData("kick", "viewers", parseInt(e.target.value) || 0)}
                          className="bg-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kick-hours">Horas Streameadas/Mes</Label>
                        <Input
                          id="kick-hours"
                          type="number"
                          value={data.kick.hoursPerMonth}
                          onChange={(e) => updateData("kick", "hoursPerMonth", parseInt(e.target.value) || 0)}
                          className="bg-secondary"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="kick-verified">Partner Verificado</Label>
                        <p className="text-sm text-muted-foreground">
                          Muestra el badge de verificacion
                        </p>
                      </div>
                      <Switch
                        id="kick-verified"
                        checked={data.kick.verified}
                        onCheckedChange={(checked) => updateData("kick", "verified", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* YouTube Section */}
            <TabsContent value="youtube">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Youtube className="h-5 w-5 text-primary" />
                      Metricas de YouTube
                    </CardTitle>
                    <CardDescription>
                      Actualiza tus estadisticas de YouTube
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="yt-views">Vistas Totales</Label>
                        <Input
                          id="yt-views"
                          value={data.youtube.views}
                          onChange={(e) => updateData("youtube", "views", e.target.value)}
                          placeholder="469.7k"
                          className="bg-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yt-watch">Tiempo de Reproduccion</Label>
                        <Input
                          id="yt-watch"
                          value={data.youtube.watchTime}
                          onChange={(e) => updateData("youtube", "watchTime", e.target.value)}
                          placeholder="3.0k"
                          className="bg-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yt-subs">Suscriptores</Label>
                        <Input
                          id="yt-subs"
                          value={data.youtube.subscribers}
                          onChange={(e) => updateData("youtube", "subscribers", e.target.value)}
                          placeholder="1k"
                          className="bg-secondary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TikTok Section */}
            <TabsContent value="tiktok">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <TikTokIcon className="h-5 w-5 text-primary" />
                      Metricas de TikTok
                    </CardTitle>
                    <CardDescription>
                      Actualiza tus estadisticas de TikTok
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tt-likes">Likes Totales</Label>
                        <Input
                          id="tt-likes"
                          value={data.tiktok.likes}
                          onChange={(e) => updateData("tiktok", "likes", e.target.value)}
                          placeholder="8k"
                          className="bg-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tt-views">Vistas Totales</Label>
                        <Input
                          id="tt-views"
                          value={data.tiktok.views}
                          onChange={(e) => updateData("tiktok", "views", e.target.value)}
                          placeholder="+200k"
                          className="bg-secondary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Social Links Section */}
            <TabsContent value="links">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Link2 className="h-5 w-5 text-primary" />
                      Enlaces Sociales
                    </CardTitle>
                    <CardDescription>
                      Configura los enlaces a tus redes sociales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="link-github">GitHub</Label>
                        <Input
                          id="link-github"
                          value={data.socialLinks.github}
                          onChange={(e) => updateData("socialLinks", "github", e.target.value)}
                          placeholder="https://github.com/tu-usuario"
                          className="bg-secondary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="link-linkedin">LinkedIn</Label>
                        <Input
                          id="link-linkedin"
                          value={data.socialLinks.linkedin}
                          onChange={(e) => updateData("socialLinks", "linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/tu-perfil"
                          className="bg-secondary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  )
}
