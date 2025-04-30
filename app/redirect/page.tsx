"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function RedirectPage() {
  const [countdown, setCountdown] = useState(3)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get destination from query parameters
  const to = searchParams.get("to") || "auth"
  const hash = searchParams.get("hash") || ""

  // Construct the destination URL
  const destinationUrl = `/${to}${hash ? `#${hash}` : ""}`

  useEffect(() => {
    // Simulate redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, []) // Empty dependency array to run only once

  useEffect(() => {
    if (countdown <= 0) {
      // Perform the actual redirect
      router.push(destinationUrl)
    }
  }, [countdown, destinationUrl, router]) // Rerun when countdown changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
      {/* Background chart line */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            d="M0,400 C100,300 200,450 300,350 C400,250 500,400 600,350 C700,300 800,450 900,400 C1000,350 1100,450 1200,400 L1200,800 L0,800 Z"
            fill="none"
            stroke="#0066FF"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="w-full max-w-md mx-auto z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <Image src="/logo-nextrade-branco.png" alt="NexTrade" width={200} height={50} className="h-16 w-auto" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-6">Aguarde para ser redirecionado!</h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">{countdown}</span>
              </div>
            </div>

            <div className="text-sm text-blue-300">
              Se você não for redirecionado automaticamente,{" "}
              <a href={destinationUrl} className="text-blue-400 hover:text-blue-300 underline">
                clique aqui
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-xs text-gray-500 space-y-2 max-w-md mx-auto"
        >
          <p>Este conteúdo está em português apenas para fins informativos.</p>
          <p>
            Você está acessando uma plataforma internacional voltada a traders que operam em regiões onde sua atividade
            é compatível com as normas locais.
          </p>
          <p>Ao prosseguir, você confirma estar ciente dessas condições e decide continuar por vontade própria.</p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 text-xs text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        © {new Date().getFullYear()} NexTrade. Todos os direitos reservados.
      </motion.div>
    </div>
  )
}
