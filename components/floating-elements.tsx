"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  const elements = [
    { x: -20, y: 20, size: 40, color: "bg-blue-500/30", delay: 0, duration: 4 },
    { x: 30, y: -30, size: 30, color: "bg-blue-600/30", delay: 0.5, duration: 3.5 },
    { x: 40, y: 40, size: 20, color: "bg-blue-700/30", delay: 1, duration: 5 },
    { x: -40, y: -40, size: 25, color: "bg-blue-400/30", delay: 1.5, duration: 4.5 },
  ]

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${element.color} backdrop-blur-sm`}
          style={{
            width: element.size,
            height: element.size,
            left: `calc(50% + ${element.x}%)`,
            top: `calc(50% + ${element.y}%)`,
            zIndex: 20,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  )
}
