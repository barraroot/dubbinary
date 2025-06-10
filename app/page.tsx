"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Globe,
  Menu,
  X,
  Check,
  ArrowUpRight,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  Star,
  Share2,
  Download,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import CountUp from "@/components/count-up"
import ParticlesBackground from "@/components/particles-background"
import GlowingButton from "@/components/glowing-button"
import TestimonialCard from "@/components/testimonial-card"
import ScrollIndicator from "@/components/scroll-indicator"
import TradeCard from "@/components/trade-card"
import ResponsiveLayout from "@/components/responsive-layout"

// Importar a função de scroll suave
import { scrollToSection } from "@/app/utils/scroll-to-section"

// Verificar se uma string é válida para uso como src em Image
const isValidImageSrc = (src: string | null | undefined): boolean => {
  return Boolean(src && src.trim() !== "")
}

// Obter um src válido ou um placeholder
const getValidImageSrc = (src: string | null | undefined, placeholder = "/placeholder.svg?text=Image"): string => {
  return isValidImageSrc(src) ? src! : placeholder
}

export default function Home() {
  // Hooks da versão desktop
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Refs for sections
  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const platformRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const partnersRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const platformInView = useInView(platformRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.5 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  // Parallax effects
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  // Header background opacity based on scroll
  const headerBgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const stats = [
    { value: 2.5, suffix: "M+", label: "Usuários ativos" },
    { value: 200, suffix: "+", label: "Ativos disponíveis" },
    { value: 99.9, suffix: "%", label: "Tempo de atividade" },
    { value: 24, suffix: "/7", label: "Suporte ao cliente" },
  ]

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: "Análise avançada",
      description: "Ferramentas de análise técnica e fundamental para decisões de investimento mais precisas.",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Execução ultrarrápida",
      description: "Ordens executadas em milissegundos, garantindo os melhores preços em mercados voláteis.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Segurança máxima",
      description: "Proteção de última geração para seus ativos e dados pessoais com criptografia de ponta a ponta.",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-500" />,
      title: "Mercados globais",
      description: "Acesso a mercados internacionais 24 horas por dia, com suporte para múltiplas moedas.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Operações programadas",
      description: "Configure operações automáticas baseadas em condições de mercado ou horários específicos.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      title: "Plataforma multi-dispositivo",
      description: "Opere de qualquer lugar com nossas aplicações nativas para desktop, web e dispositivos móveis.",
    },
  ]

  // Garantir que todos os avatares sejam válidos
  const testimonials = [
    {
      avatar: "/testimonial-1.png",
      name: "Carlos Mendes",
      role: "Investidor Profissional",
      content:
        "A ASAFE Broker revolucionou minha forma de investir. A velocidade de execução e as ferramentas de análise são incomparáveis no mercado brasileiro.",
      rating: 5,
    },
    {
      avatar: "/testimonial-2.png",
      name: "Ana Ramos",
      role: "Day Trader",
      content:
        "Depois de testar várias plataformas, a ASAFE Broker é definitivamente superior. O suporte ao cliente é excepcional e a interface é intuitiva mesmo para operações complexas.",
      rating: 5,
    },
    {
      avatar: "/testimonial-3.png",
      name: "Roberto Fayad",
      role: "Gestor de Patrimônio",
      content:
        "Recomendo a ASAFE Broker para todos os meus clientes. A segurança e a diversidade de ativos disponíveis tornam a plataforma ideal para qualquer perfil de investidor.",
      rating: 5,
    },
  ]

  // Find the partnerLogos array and update it by removing any potentially problematic images
  // Replace the current partnerLogos array with this updated one:
  const partnerLogos = [
    { src: "/partners/apple.png", alt: "Apple", width: 120, height: 40 },
    { src: "/partners/tesla.png", alt: "Tesla", width: 120, height: 40 },
    { src: "/partners/amazon.png", alt: "Amazon", width: 120, height: 40 },
    { src: "/partners/microsoft.png", alt: "Microsoft", width: 120, height: 40 },
    { src: "/logos/google-logo-new.webp", alt: "Google", width: 120, height: 40 },
    { src: "/logos/bitcoin-logo-new.png", alt: "Bitcoin", width: 120, height: 40 },
    { src: "/partners/ethereum.png", alt: "Ethereum", width: 120, height: 40 },
    { src: "/partners/coca-cola.png", alt: "Coca-Cola", width: 120, height: 40 },
    { src: "/partners/disney.png", alt: "Disney", width: 120, height: 40 },
    { src: "/partners/oil-brent.png", alt: "Oil Brent", width: 120, height: 40 },
  ]

  // Usar o componente ResponsiveLayout para renderizar a versão mobile ou desktop
  return (
    <ResponsiveLayout>
      <div className="flex min-h-screen flex-col">
        <motion.header
          className="fixed top-0 z-50 w-full"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
            style={{ opacity: headerBgOpacity }}
          />

          <div className="container relative z-10 flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="asafebroker/logomodelado_inverted.png" alt="ASAFE Broker" width={180} height={36} className="h-10 w-auto" />
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("features")
                  setMobileMenuOpen(false)
                }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Produtos
              </a>
              <a
                href="#platform"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("platform")
                  setMobileMenuOpen(false)
                }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Tecnologia
              </a>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("testimonials")
                  setMobileMenuOpen(false)
                }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Clientes
              </a>
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("cta")
                  setMobileMenuOpen(false)
                }}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Começar
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="mr-2" asChild>
                    <a href="/redirect?to=auth&hash=login">
                      Entrar
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GlowingButton asChild>
                    <a href="/redirect?to=auth&hash=register">
                      Criar conta grátis
                    </a>
                  </GlowingButton>
                </motion.div>
              </div>

              <button className="md:hidden p-2 text-gray-700 dark:text-gray-300" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col p-6"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="asafebroker/logomodelado_inverted.png" alt="ASAFE Broker" width={120} height={24} className="h-6 w-auto" />
                </Link>
                <button className="p-2 text-gray-700 dark:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-lg">
                <Link
                  href="#features"
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produtos
                </Link>
                <Link
                  href="#platform"
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tecnologia
                </Link>
                <Link
                  href="#testimonials"
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Clientes
                </Link>
                <Link
                  href="#cta"
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Começar
                </Link>
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Button variant="outline" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                  <a href="/redirect?to=auth&hash=login">
                    Entrar
                  </a>
                </Button>
                <Button
                  className="w-full bg-[#2f3630] hover:bg-[#1a45a0]"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <a href="/redirect?to=auth&hash=register">
                    Criar conta grátis
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 pt-20">
          {/* 1. Hero section (headline + subheadline) */}
          <section
            ref={heroRef}
            className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
          >
            <ParticlesBackground />

            <div className="container relative z-10 py-20 md:py-32">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <motion.div
                  className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 px-4 py-1.5 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    Nova geração de investimentos
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Invista no seu futuro com <span className="text-blue-600 dark:text-blue-400">precisão</span> e{" "}
                  <span className="text-blue-600 dark:text-blue-400">confiança</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Acesse mais de 200 ativos globais com a plataforma de investimentos mais avançada do Brasil.
                  Criptomoedas, ações internacionais e forex em um só lugar.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlowingButton size="lg" asChild>
                    <a href="/redirect?to=auth&hash=register">
                      Comece a investir agora
                    </a>
                  </GlowingButton>

                  <Button variant="outline" size="lg" className="group" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span>Agendar demonstração</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* 2. Tela da broker de trade com ativos animados */}
              <motion.div
                className="relative max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900">
                  <Image
                    src="applebroker/background.jpg"
                    alt="ASAFE Broker Trading Room"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent pointer-events-none" />
                </div>

                {/* Cards flutuantes estilizados com durações diferentes para movimento assíncrono */}
                <TradeCard
                  logo="/logos/bitcoin-logo-new.png"
                  name="Bitcoin"
                  profit="92%"
                  price="62788.64"
                  change="-0.17%"
                  isPositive={false}
                  className="absolute -top-10 -left-10 z-30"
                  delay={0.6}
                  floatDuration={3.5}
                />

                <TradeCard
                  logo="/logos/meta-logo-new.webp"
                  name="Meta"
                  profit="90%"
                  price="577.6281"
                  change="+0.13%"
                  className="absolute -bottom-10 -right-10 z-30"
                  delay={0.8}
                  floatDuration={4.2}
                />

                <TradeCard
                  logo="/logos/google-logo-new.webp"
                  name="Google"
                  profit="90%"
                  price="164.6353"
                  change="+0.06%"
                  className="absolute top-1/4 -right-10 z-30"
                  delay={1}
                  floatDuration={3.8}
                />

                <TradeCard
                  logo="/logos/apple-logo.png"
                  name="Apple"
                  profit="87%"
                  price="173.2450"
                  change="+0.42%"
                  className="absolute top-1/2 -left-10 z-30"
                  delay={1.2}
                  floatDuration={4.5}
                />
              </motion.div>
            </div>

            <ScrollIndicator />
          </section>

          {/* 3. Stats section (números subindo) */}
          <div ref={statsRef} className="container py-16 md:py-24">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center" variants={fadeInUp}>
                  <div className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-2">
                    {statsInView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 4. Parceiros e integrações confiáveis */}
          <section ref={partnersRef} className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container">
              <motion.div
                className="text-center mb-10"
                initial="hidden"
                animate={partnersInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Parceiros e integrações confiáveis
                </h2>
                <p className="text-gray-600 dark:text-gray-300">Invista nas maiores empresas do mundo com a ASAFE Broker</p>
              </motion.div>

              {/* Carousel de logos com scroll automático */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={partnersInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full overflow-hidden"
              >
                <div className="relative py-6">
                  {/* Primeira linha de logos */}
                  <div className="flex overflow-hidden">
                    <motion.div
                      className="flex items-center gap-6 min-w-max"
                      animate={{ x: [0, -2000] }}
                      transition={{
                        x: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 30,
                          ease: "linear",
                        },
                      }}
                    >
                      {partnerLogos.map((logo, index) => (
                        <div
                          key={`logo-1-${index}`}
                          className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 w-40"
                        >
                          <Image
                            src={logo.src || "/placeholder.svg"}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      ))}
                      {/* Duplicar os logos para criar um efeito de loop contínuo */}
                      {partnerLogos.map((logo, index) => (
                        <div
                          key={`logo-1-dup-${index}`}
                          className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 w-40"
                        >
                          <Image
                            src={logo.src || "/placeholder.svg"}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Segunda linha de logos (direção oposta) */}
                  <div className="flex overflow-hidden mt-6">
                    <motion.div
                      className="flex items-center gap-6 min-w-max"
                      animate={{ x: [-2000, 0] }}
                      transition={{
                        x: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 30,
                          ease: "linear",
                        },
                      }}
                    >
                      {partnerLogos.reverse().map((logo, index) => (
                        <div
                          key={`logo-2-${index}`}
                          className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 w-40"
                        >
                          <Image
                            src={logo.src || "/placeholder.svg"}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      ))}
                      {/* Duplicar os logos para criar um efeito de loop contínuo */}
                      {partnerLogos.map((logo, index) => (
                        <div
                          key={`logo-2-dup-${index}`}
                          className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 w-40"
                        >
                          <Image
                            src={logo.src || "/placeholder.svg"}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 5. Features section (recursos projetados) */}
          <section id="features" ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="container">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                  variants={fadeInUp}
                >
                  Recursos projetados para <span className="text-blue-600 dark:text-blue-400">maximizar</span> seus
                  resultados
                </motion.h2>
                <motion.p className="text-lg text-gray-600 dark:text-gray-300" variants={fadeInUp}>
                  Nossa plataforma combina tecnologia de ponta com uma interface intuitiva para oferecer a melhor
                  experiência de investimento.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 6. Platform section (plataforma completa) */}
          <section id="platform" ref={platformRef} className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial="hidden" animate={platformInView ? "visible" : "hidden"} variants={staggerContainer}>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                    variants={fadeInLeft}
                  >
                    Uma plataforma completa para todos os seus investimentos
                  </motion.h2>
                  <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-8" variants={fadeInLeft}>
                    Acesse mercados globais 24 horas por dia, 7 dias por semana, com ferramentas profissionais e uma
                    experiência de usuário excepcional.
                  </motion.p>

                  <motion.div className="space-y-6" variants={staggerContainer}>
                    <motion.div className="flex items-start gap-3" variants={fadeInLeft}>
                      <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                          Operações em múltiplos mercados
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Criptomoedas, ações internacionais, forex e commodities em uma única conta.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-3" variants={fadeInLeft}>
                      <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                          Ferramentas de análise profissional
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Gráficos avançados, indicadores técnicos e análise fundamentalista integrados.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-3" variants={fadeInLeft}>
                      <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">
                          Aplicativo móvel completo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Opere de qualquer lugar com todas as funcionalidades da plataforma desktop.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div className="mt-10" variants={fadeInLeft}>
                    <Button className="group bg-[#2f3630] hover:bg-[#2f3630]" size="lg">
                      <span>Explorar a plataforma</span>
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate={platformInView ? "visible" : "hidden"}
                  variants={fadeInRight}
                  className="relative"
                >
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="/mobile-app.png"
                      alt="ASAFE Broker Mobile App"
                      width={500}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* 7. Testimonials section (o que nossos clientes dizem) */}
          <section id="testimonials" ref={testimonialsRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="container">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                animate={testimonialsInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                  variants={fadeInUp}
                >
                  O que nossos clientes dizem
                </motion.h2>
                <motion.p className="text-lg text-gray-600 dark:text-gray-300" variants={fadeInUp}>
                  Milhares de investidores já transformaram sua experiência de investimento com a ASAFE Broker.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                animate={testimonialsInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} variants={fadeInUp} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* 8. CTA section (comece sua jornada) */}
          <section id="cta" ref={ctaRef} className="py-20 bg-blue-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10" />

            <div className="container relative z-10">
              <motion.div
                className="max-w-3xl mx-auto text-center"
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={staggerContainer}
              >
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeInUp}>
                  Comece sua jornada de investimentos hoje
                </motion.h2>
                <motion.p className="text-lg md:text-xl text-blue-100 mb-10" variants={fadeInUp}>
                  Junte-se a milhares de investidores que já estão transformando seu futuro financeiro com a ASAFE Broker.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
                  <GlowingButton size="lg" asChild>
                    <a href="/redirect?to=auth&hash=register">
                      Criar conta gratuita
                    </a>
                  </GlowingButton>

                  <Button variant="outline" size="lg" className="border-white text-black hover:bg-white/10" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Falar com um especialista
                    </a>
                  </Button>
                </motion.div>

                <motion.p className="mt-8 text-sm text-blue-200" variants={fadeInUp}>
                  Sem taxas ocultas. Cancelamento a qualquer momento.
                </motion.p>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Progress bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
          style={{ scaleX: smoothScrollYProgress }}
        />
      </div>
    </ResponsiveLayout>
  )
}
