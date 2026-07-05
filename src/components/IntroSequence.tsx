import { useState, useEffect } from 'react'
import { LazyMotion, m, domAnimation } from 'framer-motion'
import logo from '@/assets/logo.svg'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const TOTAL_MS = 3600
const TOTAL_S = TOTAL_MS / 1000

const rayAngles = [0, 30, 60, 120, 150, 210, 240, 300, 330]

function LogoImage({ onLoad, onError }: { onLoad?: () => void; onError?: () => void }) {
  return (
    <img
      src={logo}
      alt="VALMAX"
      width={268}
      height={64}
      className="block"
      onLoad={onLoad}
      onError={onError}
    />
  )
}

function LogoFallback() {
  return (
    <span className="font-display font-black text-white" style={{ fontSize: 48 }}>
      VALMAX
    </span>
  )
}

export default function IntroSequence() {
  const [hidden, setHidden] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => setHidden(true), 100)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setHidden(true), TOTAL_MS)
    return () => clearTimeout(t)
  }, [reducedMotion])

  if (hidden) return null

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-[100] pointer-events-none" style={{ backgroundColor: 'oklch(0.16 0.004 240)' }}>
        <div className="absolute" style={{ top: 24, left: 24 }}>
          {logoFailed ? <LogoFallback /> : <LogoImage onError={() => setLogoFailed(true)} />}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop */}
      <m.div
        className="absolute inset-0"
        style={{ backgroundColor: 'oklch(0.16 0.004 240)' }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: TOTAL_S, times: [0, 0.82, 1], ease: EASE }}
      />

      {/* Concentric circles */}
      {[0, 1, 2].map((i) => {
        const size = 260 * (i + 1)
        const delay = (1220 + i * 120) / 1000
        return (
          <m.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              opacity: [0, 0.55, 0],
              scale: [0.15, 1, 1.4],
            }}
            transition={{
              duration: 2.4,
              delay,
              times: [0, 0.5, 1],
              ease: EASE,
            }}
          />
        )
      })}

      {/* SVG Rays */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {rayAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x2 = 50 + 60 * Math.cos(rad)
          const y2 = 50 + 60 * Math.sin(rad)
          return (
            <m.line
              key={i}
              x1={50}
              y1={50}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={0.12}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.65, 0],
              }}
              transition={{
                duration: 2,
                delay: 1.2 + i * 0.05,
                times: [0, 0.7, 1],
                ease: EASE,
              }}
            />
          )
        })}
      </svg>

      {/* White dot */}
      <m.div
        className="absolute rounded-full bg-white"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{
          width: [8, 10, 64, 64],
          height: [8, 10, 64, 64],
          opacity: [1, 1, 1, 0],
        }}
        transition={{
          duration: TOTAL_S,
          times: [0, 0.18, 0.4, 1],
          ease: EASE,
        }}
      />

      {/* Logo container */}
      <m.div
        className="absolute"
        animate={{
          top: ['50%', '50%', '50%', '24px'],
          left: ['50%', '50%', '50%', '24px'],
          x: ['-50%', '-50%', '-50%', '0'],
          y: ['-50%', '-50%', '-50%', '0'],
          scale: [1, 1, 1, 0.42],
        }}
        transition={{
          duration: TOTAL_S,
          times: [0, 0.6, 0.82, 1],
          ease: EASE,
        }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* The actual logo image rendered at full size, clipped by parent */}
        <div
          style={{ width: 268, height: 64 }}
          className="relative"
        >
          {/* Wordmark reveal via width clip */}
          <m.div
            style={{ overflow: 'hidden', height: 64 }}
            animate={{
              width: [64, 64, 64, 268, 268],
              opacity: [0, 0, 1, 1, 1],
            }}
            transition={{
              duration: TOTAL_S,
              times: [0, 0.3, 0.42, 0.78, 1],
              ease: EASE,
            }}
          >
            {logoFailed ? (
              <span className="font-display font-black text-white" style={{ fontSize: 48 }}>
                VALMAX
              </span>
            ) : (
              <LogoImage onError={() => setLogoFailed(true)} />
            )}
          </m.div>
        </div>
      </m.div>
    </div>
  )
}
