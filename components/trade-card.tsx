"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TradeCardProps {
  logo: string
  name: string
  profit: string
  price: string
  change: string
  isPositive?: boolean
  className?: string
  initialAnimation?: {
    x?: number
    y?: number
    opacity?: number
    scale?: number
  }
  animateProps?: {
    x?: number
    y?: number
    opacity?: number
    scale?: number
  }
  delay?: number
  floatDuration?: number
}

export default function TradeCard({
  logo,
  name,
  profit,
  price,
  change,
  isPositive = true,
  className = "",
  initialAnimation = { opacity: 0 },
  animateProps = { opacity: 1 },
  delay = 0,
  floatDuration = 3,
}: TradeCardProps) {
  return (
    <motion.div
      className={`bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-800 w-[220px] ${className}`}
      initial={{ opacity: 1 }}
      animate={{
        y: [0, -10, 0, 10, 0],
      }}
      transition={{
        y: {
          duration: floatDuration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 relative flex-shrink-0">
          <Image
            src={logo || "/placeholder.svg"}
            alt={name}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-white text-lg font-medium">{name}</span>
      </div>

      <div className="mb-3">
        <div className="text-gray-400 text-xs mb-1">Lucro</div>
        <div className="text-green-400 text-3xl font-semibold">{profit}</div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-gray-400 text-xs mb-1">Preço</div>
          <div className="text-white font-medium">{price}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Mudança (5m)</div>
          <div className={`flex items-center ${isPositive ? "text-green-400" : "text-red-400"} font-medium`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {change}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
