"use client"

import { motion } from "framer-motion"
import { User, Code, Tv, MapPin } from "lucide-react"
import type { PortfolioData } from "@/lib/store"

interface AboutSectionProps {
  data: PortfolioData["about"]
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-space text-3xl font-bold text-foreground md:text-4xl">
                {data.title}
              </h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 text-lg font-medium text-primary"
          >
            {data.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8 text-lg leading-relaxed text-muted-foreground"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground">
              <Code className="h-4 w-4 text-primary" />
              <span>Desarrollo</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground">
              <Tv className="h-4 w-4 text-primary" />
              <span>Streaming</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Uruguay</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
