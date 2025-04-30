import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Função para detectar se o dispositivo é móvel com base no User-Agent
function isMobileDevice(userAgent: string): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
}

// Função para detectar se é uma tela pequena com base no viewport
function isSmallScreen(viewportWidth: string | null): boolean {
  if (!viewportWidth) return false
  const width = parseInt(viewportWidth, 10)
  return !isNaN(width) && width < 768
}

export function middleware(request: NextRequest) {
  // Obter o User-Agent do cabeçalho da requisição
  const userAgent = request.headers.get("user-agent") || ""
  
  // Obter o viewport width, se disponível
  const viewportWidth = request.headers.get("viewport-width")
  
  // Verificar se é um dispositivo móvel (por User-Agent ou viewport)
  const isMobileUA = isMobileDevice(userAgent)
  const isSmallViewport = isSmallScreen(viewportWidth)
  const isMobile = isMobileUA || isSmallViewport
  
  // Criar uma resposta com o cabeçalho personalizado para indicar se é mobile
  const response = NextResponse.next()
  
  // Adicionar um cabeçalho personalizado para indicar se é mobile
  response.headers.set("x-is-mobile", isMobile ? "true" : "false")
  
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
