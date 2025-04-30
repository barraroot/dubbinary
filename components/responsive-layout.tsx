"use client"

import { useEffect, useState } from "react"
import MobileFallback from "@/components/mobile-fallback"

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  // Estado para controlar qual versão renderizar
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  
  // Detectar se é um dispositivo móvel apenas no lado do cliente
  useEffect(() => {
    const checkMobile = () => {
      const mobileBreakpoint = 768
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    
    // Verificar inicialmente
    checkMobile()
    
    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkMobile)
    
    // Limpar listener
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Durante a renderização inicial, renderizamos o conteúdo desktop por padrão
  // Isso evita um flash de tela em branco e garante que o conteúdo seja exibido imediatamente
  if (isMobile === null) {
    return <>{children}</>
  }
  
  // Renderizar a versão mobile ou desktop com base no dispositivo
  return isMobile ? <MobileFallback /> : <>{children}</>
}