"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GlowingButton from "@/components/glowing-button"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    console.log("Password reset requested for:", email)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex justify-center mb-8 w-full">
          <Image src="/logotipo_dolbbinari.png" alt="NexTrade" width={200} height={50} className="h-12 w-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 w-full"
        >
          <Link
            href="/auth"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o login
          </Link>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recuperar senha</h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Digite o email associado à sua conta para receber instruções de recuperação.
                </p>
              </div>

              <div className="pt-2">
                <GlowingButton className="w-full">Enviar instruções</GlowingButton>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Email enviado!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Enviamos instruções de recuperação para <strong>{email}</strong>. Verifique sua caixa de entrada.
              </p>
              <Button variant="outline" asChild>
                <Link href="/auth">Voltar para o login</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-8 w-full">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-semibold mb-1">Aviso de risco:</p>
            <p>Toda negociação envolve risco. Apenas arrisque o capital que você está preparado para perder.</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Precisa de ajuda?{" "}
            <a
              href="https://t.me/NexTradeSupportBot?start=w38740082"
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com o suporte
            </a>
          </p>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 w-full">
        © {new Date().getFullYear()} NexTrade. Todos os direitos reservados.
      </div>
    </div>
  )
}
