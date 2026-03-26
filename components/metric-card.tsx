"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MetricCardProps {
  icon: ReactNode
  label: string
  value: string | ReactNode
  subtext?: string
  delay?: number
  glowColor?: string
}

export function MetricCard({ 
  icon, 
  label, 
  value, 
  subtext,
  delay = 0,
  glowColor = "rgba(220, 38, 38, 0.3)"
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300"
      style={{
        boxShadow: `0 0 0 rgba(220, 38, 38, 0)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 rgba(220, 38, 38, 0)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        
        <div className="text-3xl font-bold text-foreground">
          {value}
        </div>
        
        {subtext && (
          <p className="mt-2 text-sm text-muted-foreground">{subtext}</p>
        )}
      </div>

      <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
    </motion.div>
  )
}
