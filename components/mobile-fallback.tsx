"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  BarChart3, 
  Shield, 
  Globe, 
  Star, 
  Zap, 
  Clock, 
  Smartphone, 
  Check, 
  ArrowUpRight 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import GlowingButton from "@/components/glowing-button"
import CountUp from "@/components/count-up"

export default function MobileFallback() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [statsInView, setStatsInView] = useState(false)
  
  // Dados para as seções
  const stats = [
    { value: 2.5, suffix: "M+", label: "Usuários ativos" },
    { value: 200, suffix: "+", label: "Ativos disponíveis" },
    { value: 99.9, suffix: "%", label: "Tempo de atividade" },
    { value: 24, suffix: "/7", label: "Suporte ao cliente" },
  ]
  
  const features = [
    {
      icon: <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Análise avançada",
      description: "Ferramentas de análise técnica e fundamental para decisões de investimento mais precisas.",
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Execução ultrarrápida",
      description: "Ordens executadas em milissegundos, garantindo os melhores preços em mercados voláteis.",
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Segurança máxima",
      description: "Proteção de última geração para seus ativos e dados pessoais com criptografia de ponta a ponta.",
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Mercados globais",
      description: "Acesso a mercados internacionais 24 horas por dia, com suporte para múltiplas moedas.",
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Operações programadas",
      description: "Configure operações automáticas baseadas em condições de mercado ou horários específicos.",
    },
    {
      icon: <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "Plataforma multi-dispositivo",
      description: "Opere de qualquer lugar com nossas aplicações nativas para desktop, web e dispositivos móveis.",
    },
  ]
  
  const testimonials = [
    {
      avatar: "/testimonial-1.png",
      name: "Carlos Mendes",
      role: "Investidor Profissional",
      content:
        "A NexTrade revolucionou minha forma de investir. A velocidade de execução e as ferramentas de análise são incomparáveis no mercado brasileiro.",
      rating: 5,
    },
    {
      avatar: "/testimonial-2.png",
      name: "Ana Oliveira",
      role: "Day Trader",
      content:
        "Depois de testar várias plataformas, a NexTrade é definitivamente superior. O suporte ao cliente é excepcional e a interface é intuitiva mesmo para operações complexas.",
      rating: 5,
    },
    {
      avatar: "/testimonial-3.png",
      name: "Roberto Santos",
      role: "Gestor de Patrimônio",
      content:
        "Recomendo a NexTrade para todos os meus clientes. A segurança e a diversidade de ativos disponíveis tornam a plataforma ideal para qualquer perfil de investidor.",
      rating: 5,
    },
  ]
  
  const partnerLogos = [
    { src: "/partners/apple.png", alt: "Apple" },
    { src: "/partners/tesla.png", alt: "Tesla" },
    { src: "/partners/amazon.png", alt: "Amazon" },
    { src: "/partners/microsoft.png", alt: "Microsoft" },
    { src: "/logos/google-logo-new.webp", alt: "Google" },
    { src: "/logos/bitcoin-logo-new.png", alt: "Bitcoin" },
    { src: "/partners/ethereum.png", alt: "Ethereum" },
    { src: "/partners/coca-cola.png", alt: "Coca-Cola" },
    { src: "/partners/disney.png", alt: "Disney" },
    { src: "/partners/oil-brent.png", alt: "Oil Brent" },
  ]

  // Função para ativar a animação dos stats quando a seção estiver visível
  const handleStatsInView = () => {
    if (!statsInView) {
      setStatsInView(true)
    }
  }

  // Usar IntersectionObserver para detectar quando a seção de stats está visível
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleStatsInView()
          }
        },
        { threshold: 0.5 }
      )
      
      const statsSection = document.getElementById('stats-section')
      if (statsSection) {
        observer.observe(statsSection)
      }
      
      return () => {
        if (statsSection) {
          observer.unobserve(statsSection)
        }
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      {/* Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex items-center justify-between px-5 h-16">
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image src="/icone-nextrade-azul.png" alt="NexTrade" width={28} height={28} className="h-7 w-auto" />
            </motion.div>
            <Image src="/logotipo_dolbbinari.png" alt="NexTrade" width={120} height={24} className="h-6 w-auto dark:hidden" />
            <Image src="/logo-nextrade-branco.png" alt="NexTrade" width={120} height={24} className="h-6 w-auto hidden dark:block" />
          </Link>
          <motion.button
            className="p-2 text-gray-700 dark:text-gray-300 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
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
                <Image src="/icone-nextrade-azul.png" alt="NexTrade" width={28} height={28} className="h-7 w-auto" />
                <Image src="/logotipo_dolbbinari.png" alt="NexTrade" width={120} height={24} className="h-6 w-auto dark:hidden" />
                <Image src="/logo-nextrade-branco.png" alt="NexTrade" width={120} height={24} className="h-6 w-auto hidden dark:block" />
              </Link>
              <motion.button
                className="p-2 text-gray-700 dark:text-gray-300 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <nav className="flex flex-col gap-5 text-lg mb-8">
              <Link
                href="#features"
                className="flex items-center justify-between py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Produtos</span>
              </Link>
              <Link
                href="#platform"
                className="flex items-center justify-between py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Tecnologia</span>
              </Link>
              <Link
                href="#testimonials"
                className="flex items-center justify-between py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Clientes</span>
              </Link>
              <Link
                href="#cta"
                className="flex items-center justify-between py-3 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Começar</span>
              </Link>
            </nav>

            <div className="mt-auto space-y-4">
              <Button variant="outline" className="w-full h-12 text-base" asChild>
                <a href="/redirect?to=auth&hash=login">
                  Entrar
                </a>
              </Button>
              <Button
                className="w-full h-12 text-base bg-[#1e4fac] hover:bg-[#1a45a0]"
                asChild
              >
                <a href="/redirect?to=auth&hash=register">
                  Criar conta grátis
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16">
        {/* 1. Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-5 py-14">
          {/* Elementos de fundo sutis */}
          <div className="absolute top-20 left-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 px-3 py-1.5 mb-5">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Nova geração de investimentos
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
                Invista no seu futuro com <span className="text-blue-600">precisão</span> e{" "}
                <span className="text-blue-600">confiança</span>
              </h1>

              <p className="text-base text-gray-600 dark:text-gray-300 mb-7">
                Acesse mais de 200 ativos globais com a plataforma de investimentos mais avançada do Brasil.
              </p>

              <div className="flex flex-col gap-3">
                <GlowingButton className="h-12 text-base">
                  <a href="/redirect?to=auth&hash=register">
                    Comece a investir agora
                  </a>
                </GlowingButton>
                <Button variant="outline" className="group h-12 text-base" asChild>
                  <a href="https://t.me/NexTradeSupportBot?start=w38740082" target="_blank" rel="noopener noreferrer">
                    <span>Agendar demonstração</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Trading Platform Image */}
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-gray-900 mt-10">
              <Image
                src="/nextrade-traderoom.png"
                alt="NexTrade Trading Room"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent pointer-events-none" />
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-8">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="h-6 w-6 text-blue-500" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Stats Section */}
        <section id="stats-section" className="px-5 py-12 bg-white dark:bg-gray-900">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-2">
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
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Partners Section */}
        <section id="partners" className="px-5 py-12 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Parceiros confiáveis
          </h2>
          
          <div className="w-full overflow-hidden">
            {/* Primeira linha de logos (movimento para a esquerda) */}
            <div className="flex overflow-hidden mb-4">
              <motion.div
                className="flex items-center gap-4 min-w-max"
                animate={{ x: [0, -1000] }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {partnerLogos.slice(0, 5).map((logo, index) => (
                  <div
                    key={`logo-1-${index}`}
                    className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-16 w-24"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
                {/* Duplicar os logos para criar um efeito de loop contínuo */}
                {partnerLogos.slice(0, 5).map((logo, index) => (
                  <div
                    key={`logo-1-dup-${index}`}
                    className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-16 w-24"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Segunda linha de logos (movimento para a direita) */}
            <div className="flex overflow-hidden">
              <motion.div
                className="flex items-center gap-4 min-w-max"
                animate={{ x: [-1000, 0] }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {partnerLogos.slice(5, 10).map((logo, index) => (
                  <div
                    key={`logo-2-${index}`}
                    className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-16 w-24"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
                {/* Duplicar os logos para criar um efeito de loop contínuo */}
                {partnerLogos.slice(5, 10).map((logo, index) => (
                  <div
                    key={`logo-2-dup-${index}`}
                    className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm h-16 w-24"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="px-5 py-12 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Recursos projetados para maximizar seus resultados
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* 5. Platform Section */}
        <section id="platform" className="px-5 py-12 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Uma plataforma completa para todos os seus investimentos
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Acesse mercados globais 24 horas por dia, 7 dias por semana, com ferramentas profissionais e uma experiência de usuário excepcional.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-900 dark:text-white">
                  Operações em múltiplos mercados
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Criptomoedas, ações internacionais, forex e commodities em uma única conta.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-900 dark:text-white">
                  Ferramentas de análise profissional
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gráficos avançados, indicadores técnicos e análise fundamentalista integrados.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-gray-900 dark:text-white">
                  Aplicativo móvel completo
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Opere de qualquer lugar com todas as funcionalidades da plataforma desktop.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
            <Image
              src="/mobile-app.png"
              alt="NexTrade Mobile App"
              width={500}
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent pointer-events-none" />
          </div>
          
          <Button className="w-full group bg-[#1e4fac] hover:bg-[#1a45a0]" size="lg">
            <span>Explorar a plataforma</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </section>
        
        {/* 6. Testimonials Section */}
        <section id="testimonials" className="px-5 py-12 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            O que nossos clientes dizem
          </h2>
          
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={40} 
                    height={40} 
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  "{testimonial.content}"
                </p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 7. CTA Section */}
        <section id="cta" className="px-5 py-12 bg-blue-900 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Comece sua jornada de investimentos hoje
            </h2>
            <p className="text-blue-100 mb-6">
              Junte-se a milhares de investidores que já estão transformando seu futuro financeiro com a NexTrade.
            </p>
            <GlowingButton className="w-full mb-3">
              <a href="/redirect?to=auth&hash=register">
                Criar conta gratuita
              </a>
            </GlowingButton>
            <Button variant="outline" className="w-full border-white text-black hover:bg-white/10" asChild>
              <a href="https://t.me/NexTradeSupportBot?start=w38740082" target="_blank" rel="noopener noreferrer">
                Falar com um especialista
              </a>
            </Button>
            <p className="mt-6 text-sm text-blue-200">
              Sem taxas ocultas. Cancelamento a qualquer momento.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 px-5">
        <div className="flex items-center gap-2 mb-4">
          <Image src="/icone-nextrade-azul.png" alt="NexTrade" width={28} height={28} className="h-7 w-auto" />
          <Image src="/logo-nextrade-branco.png" alt="NexTrade" width={120} height={24} className="h-6 w-auto" />
        </div>
        <p className="text-xs mb-6">
          A plataforma de investimentos completa para você operar no mercado financeiro com segurança e agilidade.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-white font-medium mb-3 text-sm">Produtos</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Criptomoedas</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Ações</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Forex</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-3 text-sm">Suporte</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Central de Ajuda</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Contato</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-4 text-xs text-center">
          <p>© {new Date().getFullYear()} NexTrade. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}