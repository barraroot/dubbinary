"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll para explorar</span>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
        <ChevronDown className="h-6 w-6 text-blue-500" />
      </motion.div>
    </motion.div>
  )
}
