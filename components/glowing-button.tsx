"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface GlowingButtonProps {
  children: ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export default function GlowingButton({ children, className, size = "default", asChild }: GlowingButtonProps) {
  return (
    <div className="relative group">
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <Button size={size} className={cn("relative bg-[#6732FF] hover:bg-[#6732FF] text-white", className)} asChild={asChild}>
        {children}
      </Button>
    </div>
  )
}
