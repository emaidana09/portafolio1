"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PlatformSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
  gradient?: string
}

export function PlatformSection({ 
  title, 
  icon, 
  children,
  gradient = "from-primary/20 to-transparent"
}: PlatformSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-50 blur-3xl`} />
      
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <h2 className="font-space text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>
    </motion.section>
  )
}
