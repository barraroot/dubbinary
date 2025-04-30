"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialProps {
  avatar: string
  name: string
  role: string
  content: string
  rating: number
  variants?: any
}

export default function TestimonialCard({ testimonial, variants }: { testimonial: TestimonialProps; variants: any }) {
  // Usar um placeholder padrão se o avatar não existir ou for uma string vazia
  const avatarSrc =
    testimonial.avatar && testimonial.avatar.trim() !== "" ? testimonial.avatar : "/placeholder.svg?text=User"

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
      variants={variants}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={avatarSrc || "/placeholder.svg"}
          alt={testimonial.name}
          width={64}
          height={64}
          className="rounded-full object-cover h-12 w-12"
        />
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>

      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
