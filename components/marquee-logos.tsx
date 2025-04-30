"use client"
import Image from "next/image"
import { motion } from "framer-motion"

interface MarqueeLogosProps {
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export default function MarqueeLogos({ speed = 40, direction = "left", pauseOnHover = true }: MarqueeLogosProps) {
  // Lista de logos confirmados que existem
  const logos = [
    { src: "/partners/apple.png", alt: "Apple", width: 100, height: 40 },
    { src: "/partners/tesla.png", alt: "Tesla", width: 100, height: 40 },
    { src: "/logos/meta-logo-new.webp", alt: "Meta", width: 100, height: 40 },
    { src: "/partners/amazon.png", alt: "Amazon", width: 100, height: 40 },
    { src: "/partners/microsoft.png", alt: "Microsoft", width: 100, height: 40 },
    { src: "/logos/google-logo-new.webp", alt: "Google", width: 100, height: 40 },
    { src: "/logos/bitcoin-logo-new.png", alt: "Bitcoin", width: 100, height: 40 },
    { src: "/partners/ethereum.png", alt: "Ethereum", width: 100, height: 40 },
    { src: "/partners/ouro.png", alt: "Ouro", width: 100, height: 40 },
    { src: "/partners/gas.png", alt: "Gas", width: 100, height: 40 },
    { src: "/partners/coca-cola.png", alt: "Coca-Cola", width: 100, height: 40 },
    { src: "/partners/disney.png", alt: "Disney", width: 100, height: 40 },
    { src: "/partners/oil-brent.png", alt: "Oil Brent", width: 100, height: 40 },
    { src: "/partners/doge.png", alt: "Dogecoin", width: 100, height: 40 },
  ]

  // Calculate animation duration based on number of logos and speed
  const duration = (logos.length * 2) / (speed / 20)

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className={`inline-flex ${pauseOnHover ? "group" : ""}`} style={{ touchAction: "pan-y" }}>
        <motion.div
          className="flex items-center"
          animate={{ x: direction === "left" ? [0, -100 * logos.length] : [-100 * logos.length, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration: duration,
            repeatType: "loop",
          }}
          {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
        >
          {logos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="mx-8 flex items-center justify-center h-12 transition-all duration-300 hover:scale-110"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>

        {/* Duplicate set for seamless looping */}
        <motion.div
          className="flex items-center"
          animate={{ x: direction === "left" ? [0, -100 * logos.length] : [-100 * logos.length, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration: duration,
            repeatType: "loop",
          }}
          {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
        >
          {logos.map((logo, index) => (
            <div
              key={`logo-dup-${index}`}
              className="mx-8 flex items-center justify-center h-12 transition-all duration-300 hover:scale-110"
            >
              <Image
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
