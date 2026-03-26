"use client"

import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import type { PortfolioData } from "@/lib/store"

interface FooterProps {
  links: PortfolioData["socialLinks"]
}

export function Footer({ links }: FooterProps) {
  const socialLinks = [
    { name: "GitHub", href: links.github, icon: <Github className="h-5 w-5" /> },
    { name: "LinkedIn", href: links.linkedin, icon: <Linkedin className="h-5 w-5" /> },
  ]

  return (
    <footer className="relative border-t border-border bg-card/50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} - Todos los derechos reservados
            </p>
            <a
              href="/admin"
              className="mt-2 inline-block text-xs text-muted-foreground/50 transition-colors hover:text-primary"
            >
              Panel de Admin
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
