import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  offset: number
}

interface RingStar {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  offset: number
  radiusOffset: number
}

interface StarFieldProps {
  count?: number
  className?: string
  ring?: boolean
  ringCount?: number
  ringRadiusFactor?: number
  ringBandWidth?: number
}

function gaussianRandom(): number {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

export default function StarField({
  count = 600,
  className = 'absolute inset-0 pointer-events-none',
  ring = false,
  ringCount = 240,
  ringRadiusFactor = 0.36,
  ringBandWidth = 52,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let bgStars: Star[] = []
    let ringStars: RingStar[] = []
    let animId = 0

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)

      bgStars = []
      for (let i = 0; i < count; i++) {
        const rRand = Math.random()
        let r: number
        if (rRand < 0.65) r = 0.25 + Math.random() * 0.25
        else if (rRand < 0.92) r = 0.5 + Math.random() * 0.3
        else r = 0.8 + Math.random() * 0.5
        bgStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          opacity: 0.2 + Math.random() * 0.75,
          speed: 0.4 + Math.random() * 1.2,
          offset: Math.random() * Math.PI * 2,
        })
      }

      if (ring) {
        ringStars = []
        const cx = w / 2
        const cy = h / 2
        const ringR = Math.min(w, h) * ringRadiusFactor
        const half = ringBandWidth / 2
        for (let i = 0; i < ringCount * 2; i++) {
          const angle = Math.random() * Math.PI * 2
          const offset = gaussianRandom() * half * 0.65
          const dist = ringR + offset
          const rRand = Math.random()
          let r: number
          if (rRand < 0.7) r = 0.15 + Math.random() * 0.15
          else if (rRand < 0.93) r = 0.3 + Math.random() * 0.2
          else r = 0.5 + Math.random() * 0.2
          ringStars.push({
            x: cx + dist * Math.cos(angle),
            y: cy + dist * Math.sin(angle),
            r,
            opacity: 0.25 + Math.random() * 0.55,
            speed: 0.3 + Math.random() * 1.0,
            offset: Math.random() * Math.PI * 2,
            radiusOffset: offset,
          })
        }
      }
    }

    resize()

    const ro = new ResizeObserver(() => resize())
    const parent = canvas.parentElement
    if (parent) ro.observe(parent)

    function draw() {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, w, h)

      const t = performance.now() / 1000

      // Draw background stars
      for (const star of bgStars) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * star.speed + star.offset) * 0.5 + 0.5
        const alpha = star.opacity * twinkle
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        if (star.r > 1.1) {
          const grad = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.r * 4
          )
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`)
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
      }

      if (ring) {
        const cx = w / 2
        const cy = h / 2
        const ringR = Math.min(w, h) * ringRadiusFactor
        const half = ringBandWidth / 2

        // Halo
        const haloGrad = ctx.createRadialGradient(cx, cy, Math.max(0, ringR - ringBandWidth * 4), cx, cy, ringR + ringBandWidth * 4)
        haloGrad.addColorStop(0, `rgba(255, 255, 255, 0.022)`)
        haloGrad.addColorStop(0.42, `rgba(255, 255, 255, 0.022)`)
        haloGrad.addColorStop(0.5, `rgba(255, 255, 255, 0.038)`)
        haloGrad.addColorStop(0.58, `rgba(255, 255, 255, 0.022)`)
        haloGrad.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.beginPath()
        ctx.arc(cx, cy, ringR + ringBandWidth * 4, 0, Math.PI * 2)
        ctx.fillStyle = haloGrad
        ctx.fill()

        // Ring stars
        for (const star of ringStars) {
          const twinkle = 0.55 + 0.45 * (Math.sin(t * star.speed + star.offset) * 0.5 + 0.5)
          const distFactor = Math.max(0.15, 1 - Math.abs(star.radiusOffset) / (ringBandWidth * 0.65))
          const alpha = star.opacity * twinkle * distFactor
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fill()

          if (star.r > 1.0) {
            const grad = ctx.createRadialGradient(
              star.x, star.y, 0,
              star.x, star.y, star.r * 5
            )
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`)
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.r * 5, 0, Math.PI * 2)
            ctx.fillStyle = grad
            ctx.fill()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count, ring, ringCount, ringRadiusFactor, ringBandWidth])

  return <canvas ref={canvasRef} className={className} style={{ zIndex: 0 }} />
}
