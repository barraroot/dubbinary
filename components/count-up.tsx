"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  start: number
  end: number
  duration: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function CountUp({
  start,
  end,
  duration,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (delay) {
      timeout = setTimeout(() => {
        setIsVisible(true)
      }, delay * 1000)
    } else {
      setIsVisible(true)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = progress * (end - start) + start

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [start, end, duration, isVisible])

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}
