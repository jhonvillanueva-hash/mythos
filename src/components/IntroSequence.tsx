import { useState, useEffect } from 'react'
import { LazyMotion, m, domAnimation } from 'framer-motion'
import logo from '@/assets/logo.svg'
import noise from '@/assets/noise.png'
import StarField from './StarField'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const TOTAL_MS = 5000
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

  /* Trava scroll só durante a intro; restaura quando hidden muda ou desmonta */
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [hidden])

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
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 z-[100]" style={{ backgroundColor: 'oklch(0.16 0.004 240)' }}>
        {/* Backdrop */}
        <m.div
          className="absolute inset-0"
          style={{ backgroundColor: 'oklch(0.16 0.004 240)' }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: TOTAL_S, times: [0, 0.88, 1], ease: EASE }}
        />

        {/* Decoraciones — fade out sincronizado com o logo */}
        <m.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: TOTAL_S, times: [0, 0.88, 1], ease: EASE }}
        >
          <StarField count={300} className="absolute inset-0" />

          <img
            src={noise}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-overlay"
          />

        </m.div>

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

        {/* White dot — aparece rápido, expande y se funde con el logo */}
        <m.div
          className="absolute rounded-full bg-white"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          initial={{ opacity: 0, width: 8, height: 8 }}
          animate={{
            width: [8, 8, 60, 60, 60],
            height: [8, 8, 60, 60, 60],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: TOTAL_S,
            times: [0, 0.03, 0.12, 0.3, 1],
            ease: EASE,
          }}
        />

        {/* Logo no centro — fade in, fica visível BASTANTE tempo, fade out SEM movimento */}
        <m.div
          className="absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transformOrigin: 'center center' }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 1, 1, 1, 0],
          }}
          transition={{
            duration: TOTAL_S,
            /*                     ↓entra ↓visível  ↓começa sair↓fim  */
            times: [0, 0.12, 0.16, 0.3, 0.88, 1],
            ease: EASE,
          }}
        >
          <div style={{ width: 268, height: 64 }} className="relative">
            {/* Wordmark — revela rápido (16-30%), fica full width MUITO tempo, some por fade */}
            <m.div
              style={{ overflow: 'hidden', height: 64 }}
              initial={{ opacity: 0, width: 64 }}
              animate={{
                width: [64, 64, 64, 268, 268, 268],
                opacity: [0, 0, 1, 1, 1, 0],
              }}
              transition={{
                duration: TOTAL_S,
                times: [0, 0.12, 0.16, 0.3, 0.88, 1],
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
    </LazyMotion>
  )
}
