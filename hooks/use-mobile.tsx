"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Função para detectar se o dispositivo é móvel com base no User-Agent
function isMobileUserAgent(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function useIsMobile() {
  // Usar useState com valor inicial undefined para evitar problemas de hidratação
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  
  // useEffect para detectar dispositivo móvel apenas no cliente
  React.useEffect(() => {
    // Função para atualizar o estado com base na largura da tela e User-Agent
    const updateIsMobile = () => {
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT
      const isMobileUA = isMobileUserAgent()
      setIsMobile(isMobileWidth || isMobileUA)
    }

    // Adicionar listener para mudanças de tamanho da tela
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", updateIsMobile)
    
    // Atualizar o estado inicialmente
    updateIsMobile()
    
    // Limpar listener
    return () => mql.removeEventListener("change", updateIsMobile)
  }, [])

  // Retornar undefined durante a renderização do servidor
  // e o valor real apenas no cliente após o useEffect
  return isMobile
}
