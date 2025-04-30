"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function TradingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Chart data - simulating Bitcoin price
    const data = generateChartData(100)

    // Animation variables
    let animationFrame: number
    let currentPoint = 0

    // Draw function
    const draw = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height)

      // Draw chart
      drawChart(ctx, data.slice(0, currentPoint + 1), canvas.width, canvas.height)

      // Increment point for animation
      if (currentPoint < data.length - 1) {
        currentPoint++
        animationFrame = requestAnimationFrame(draw)
      }
    }

    // Start animation
    animationFrame = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <motion.div
      className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

// Helper functions
function generateChartData(points: number) {
  const data = []
  let value = 30000 + Math.random() * 5000

  for (let i = 0; i < points; i++) {
    // Simulate price movement
    value = value + (Math.random() - 0.48) * 1000
    data.push(value)
  }

  return data
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "#2d3748"
  ctx.lineWidth = 0.5

  // Horizontal lines
  for (let i = 0; i < 5; i++) {
    const y = (height / 5) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Vertical lines
  for (let i = 0; i < 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
}

function drawChart(ctx: CanvasRenderingContext2D, data: number[], width: number, height: number) {
  if (data.length < 2) return

  // Find min and max for scaling
  const min = Math.min(...data) * 0.95
  const max = Math.max(...data) * 1.05
  const range = max - min

  // Calculate x and y scaling
  const xScale = width / (data.length - 1)

  // Draw line
  ctx.strokeStyle = "#5dade2" // Azul claro da paleta
  ctx.lineWidth = 2
  ctx.beginPath()

  // Move to first point
  const initialY = height - ((data[0] - min) / range) * height
  ctx.moveTo(0, initialY)

  // Draw lines to each point
  for (let i = 1; i < data.length; i++) {
    const x = i * xScale
    const y = height - ((data[i] - min) / range) * height
    ctx.lineTo(x, y)
  }

  ctx.stroke()

  // Add gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, "rgba(93, 173, 226, 0.2)") // Azul claro com transparência
  gradient.addColorStop(1, "rgba(93, 173, 226, 0)")

  ctx.fillStyle = gradient
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.fill()

  // Add price points
  const lastIndex = data.length - 1
  const lastPrice = data[lastIndex]
  const lastX = lastIndex * xScale
  const lastY = height - ((lastPrice - min) / range) * height

  // Draw circle at last point
  ctx.fillStyle = "#5dade2" // Azul claro da paleta
  ctx.beginPath()
  ctx.arc(lastX, lastY, 4, 0, Math.PI * 2)
  ctx.fill()

  // Draw price text
  ctx.fillStyle = "#ffffff"
  ctx.font = "12px sans-serif"
  ctx.fillText(`$${Math.round(lastPrice).toLocaleString()}`, lastX + 10, lastY - 10)
}
