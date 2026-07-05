import { useState, useEffect, useRef, useCallback } from 'react'
import { LazyMotion, m, domAnimation, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Instagram, MoveRight, Menu } from 'lucide-react'
import IntroSequence from './IntroSequence'
import StarField from './StarField'
import LineField from './LineField'

/* ─── assets locais ─── */
import noise from '@/assets/noise.png'
import ellipseArc from '@/assets/ellipse-arc.png'
import bgFabric from '@/assets/bg-fabric.png'
import bgSilhouettes from '@/assets/bg-silhouettes.png'
import bgNikon from '@/assets/bg-nikon.png'
import getInTouchBg from '@/assets/get-in-touch-bg.png'
import vectorArrow from '@/assets/Vector.svg'
import logo from '@/assets/logo.svg'
import photoRalphPortrait from '@/assets/photo-ralph-portrait.png'
import photoCamera from '@/assets/photo-camera.png'
import photoFieldsBw from '@/assets/photo-fields-bw.png'
import photoBerries from '@/assets/photo-berries.png'
import photoBasketball from '@/assets/photo-basketball.png'
import photoRed from '@/assets/photo-red.png'
import photoHat from '@/assets/photo-hat.png'
import photoSculptureBw from '@/assets/photo-sculpture-bw.png'
import photoTwins from '@/assets/photo-twins.png'
import photoCar from '@/assets/photo-car.png'
import photoFieldsColor from '@/assets/photo-fields-color.png'
import photoGirlGrass from '@/assets/photo-girl-grass.png'
import photoSculptureColor from '@/assets/photo-sculpture-color.png'

/* ─── constants ─── */
const INTRO_DELAY = 2.9
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const MATTE = 'bg-[oklch(0.16_0.004_240)]'

const blurIn = {
  hidden: { opacity: 0, y: 24, filter: 'blur(14px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, delay: INTRO_DELAY + i * 0.08, ease: EASE },
  }),
}

const photoIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: INTRO_DELAY + 0.1 + i * 0.1,
      ease: EASE,
    },
  }),
}

/* ─── image helpers ─── */
function PhotoImg({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return <div className={className ?? ''} style={{ ...style, background: 'oklch(0.18 0 0)' }} aria-hidden="true" />
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  )
}

function DecorativeImg({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={src}
      alt=""
      className={className}
      style={style}
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  )
}

/* ─── badges ─── */
function Badge({ type }: { type: 'ig' | 'pin' }) {
  return (
    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-md bg-black/40 backdrop-blur-sm grid place-items-center text-white/80">
      {type === 'ig' ? (
        <Instagram className="w-3 h-3" />
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-1-.2-2.5 0-3.6l1.5-6.3s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4 .2.7.8 1.4 1.7 1.4 2 0 3.5-2.2 3.5-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2 .9 2.6.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3-.1.2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.6-6.9 4 0 7.1 2.8 7.1 6.6 0 4-2.5 7.2-6 7.2-1.2 0-2.3-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1A12 12 0 1 0 12 0z" />
        </svg>
      )}
    </div>
  )
}

/* ─── TopBar ─── */
function TopBar({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (email) setEmail('')
    },
    [email],
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <m.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
        >
          {logoFailed ? (
            <span className="font-display font-black text-white text-xl">VALMAX</span>
          ) : (
            <img
              src={logo}
              alt="VALMAX"
              className="h-6 w-auto"
              onError={() => setLogoFailed(true)}
            />
          )}
        </m.a>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
          className="hidden md:flex items-center gap-6"
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center border border-white/15 rounded-full px-4 py-2 text-xs text-white/50 bg-white/[0.03] focus-within:border-white/30 transition-colors"
          >
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white text-xs min-w-[120px] placeholder:text-white/30"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="ml-2 text-white/40 hover:text-white transition-colors"
              aria-label="Subscribe"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          <span className="text-xs uppercase tracking-widest text-white/40">About</span>
          <span className="text-xs uppercase tracking-widest text-white/40">Projects</span>
          <span className="text-xs uppercase tracking-widest text-white/40">Contact</span>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-white/80 hover:text-white transition-colors focus-visible:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </m.div>

        <m.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: INTRO_DELAY - 0.2, ease: EASE }}
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-white focus-visible:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </m.button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl pt-20 px-6 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl focus-visible:outline-none"
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6 mt-8">
            {['About', 'Projects', 'Contact'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-lg font-medium transition-colors hover:text-white/70"
              >
                {label}
              </button>
            ))}
          </nav>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/80 bg-white/[0.04]"
          >
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white text-sm flex-1 placeholder:text-white/30"
              aria-label="Email address"
            />
            <button
              type="submit"
              aria-label="Send email"
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Follow</span>
            <span className="flex items-center gap-1 text-white/50">
              Instagram
              <Instagram className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </header>
  )
}

/* ─── ViewAlbum overlay ─── */
function ViewAlbumOverlay() {
  return (
    <div className="absolute left-4 bottom-5 pointer-events-none flex items-center gap-2.5">
      <div className="relative grid place-items-center">
        <div className="absolute w-[55px] h-[55px] rounded-full bg-white/30 blur-[10px]" />
        <div className="absolute w-[38px] h-[38px] rounded-full bg-white/50 blur-[4px]" />
        <div className="w-[25px] h-[25px] rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.7)]" />
      </div>
      <div
        className="grid place-items-center rounded-full bg-black/35 backdrop-blur-md text-white border border-white/15"
        style={{ width: 119, height: 39, fontSize: 13 }}
      >
        View album
      </div>
    </div>
  )
}

/* ─── Hero photo cards ─── */
interface HeroCard {
  src: string
  alt: string
  pos: React.CSSProperties
  size: { w: number; aspect: string }
  depth: number
  badge?: 'ig' | 'pin'
  overlay?: boolean
}

const heroCards: HeroCard[] = [
  { src: photoFieldsBw, alt: 'Fields', pos: { top: '2%', left: '34%' }, size: { w: 150, aspect: '4/3' }, depth: 18, badge: 'ig' },
  { src: photoBerries, alt: 'Berries', pos: { top: '2%', right: '2%' }, size: { w: 260, aspect: '16/9' }, depth: 22 },
  { src: photoBasketball, alt: 'Athlete', pos: { top: '7%', left: '4%' }, size: { w: 110, aspect: '3/4' }, depth: 28, badge: 'ig' },
  { src: photoRed, alt: 'Portrait red', pos: { top: '10%', right: '12%' }, size: { w: 200, aspect: '3/4' }, depth: 26, badge: 'pin', overlay: true },
  { src: photoHat, alt: 'Hat', pos: { top: '18%', left: '3%' }, size: { w: 220, aspect: '3/4' }, depth: 20, badge: 'ig' },
  { src: photoSculptureBw, alt: 'Sculpture', pos: { bottom: 'calc(6%-10px)', left: 'calc(34%-90px)' }, size: { w: 160, aspect: '4/5' }, depth: 24, badge: 'pin' },
  { src: photoTwins, alt: 'Twins', pos: { bottom: '6%', right: '22%' }, size: { w: 230, aspect: '16/10' }, depth: 22 },
]

/* ─── RalphHero ─── */
function RalphHero() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const handleMouse = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 2
      const y = ((e.clientY / window.innerHeight) - 0.5) * 2
      document.documentElement.style.setProperty('--mx', String(x))
      document.documentElement.style.setProperty('--my', String(y))
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reducedMotion])

  return (
    <section className={`relative ${MATTE} min-h-[110vh] pt-32 pb-24 overflow-hidden`}>
      <StarField count={700} className="absolute inset-0 pointer-events-none" />
      <LineField variant="hero" />
      <DecorativeImg
        src={noise}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay"
        style={{ zIndex: 1 }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <DecorativeImg
          src={ellipseArc}
          className="absolute opacity-50"
          style={{ width: 1500, top: '10%', left: '50%', transform: 'translateX(-78%)' }}
        />
        <DecorativeImg
          src={ellipseArc}
          className="absolute opacity-50"
          style={{ width: 1500, top: '10%', left: '50%', transform: 'translateX(-22%)' }}
        />
      </div>

      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"
        style={{ width: 800, height: 800, zIndex: 1 }}
      />

      <div className="relative z-10 grid place-items-center min-h-[80vh] px-6 text-center">
        <div className="max-w-2xl">
          <m.h1
            className="font-display font-black text-7xl md:text-[110px] leading-[0.95] tracking-tight"
            variants={blurIn}
            initial="hidden"
            animate="show"
            custom={1}
          >
            RALPH
            <br />
            EDWARDS
          </m.h1>
          <m.p
            className="mt-8 text-white/55 text-base md:text-[15px] leading-relaxed max-w-md mx-auto"
            variants={blurIn}
            initial="hidden"
            animate="show"
            custom={3}
          >
            Crafting digital experiences that captivate and inspire. Elevating your brand through design and innovation.
          </m.p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        {heroCards.map((card, i) => (
          <m.div
            key={card.src}
            className="absolute overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 group pointer-events-auto"
            style={{
              ...card.pos,
              width: card.size.w,
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            } as React.CSSProperties}
            variants={photoIn}
            initial="hidden"
            animate="show"
            custom={i}
          >
            <PhotoImg
              src={card.src}
              alt={card.alt}
              className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              style={{ aspectRatio: card.size.aspect }}
            />
            {card.badge && <Badge type={card.badge} />}
            {card.overlay && <ViewAlbumOverlay />}
          </m.div>
        ))}
      </div>
    </section>
  )
}

/* ─── OurPhotographer ─── */
function OurPhotographer() {
  return (
    <section className={`relative ${MATTE} px-6 md:px-12 py-32 overflow-hidden`}>
      <StarField count={500} className="absolute inset-0 pointer-events-none" />
      <LineField variant="photographer" />
      <DecorativeImg
        src={noise}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay"
        style={{ zIndex: 1 }}
      />

      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl pointer-events-none"
        style={{ width: 500, height: 500, zIndex: 1 }}
      />

      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 1 }}>
        <DecorativeImg
          src={bgFabric}
          className="absolute opacity-[0.13]"
          style={{ left: 0, top: '33.33%', width: 280, maxWidth: 'none' }}
        />
        <DecorativeImg
          src={bgSilhouettes}
          className="absolute opacity-[0.16]"
          style={{ right: 0, top: '12%', width: 360, maxWidth: 'none' }}
        />
        <DecorativeImg
          src={bgNikon}
          className="absolute opacity-[0.14]"
          style={{ right: '4%', bottom: 0, width: 280, maxWidth: 'none' }}
        />
      </div>

      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        <m.div
          className="relative bg-[#efeae0] p-4 pb-20 w-full max-w-[440px] justify-self-center md:justify-self-end shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 60, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <m.h2
            className="font-display font-medium text-4xl md:text-5xl leading-[0.95] uppercase text-white whitespace-nowrap"
            style={{ position: 'absolute', top: '-4rem', left: '40rem', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            Our photographer
          </m.h2>

          <PhotoImg
            src={photoRalphPortrait}
            alt="Ralph Edwards portrait"
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="absolute bottom-6 left-6">
            <p className="text-black font-display font-black text-2xl leading-none">
              RALPH
              <br />
              EDWARDS
            </p>
          </div>
        </m.div>

        <div className="space-y-8 max-w-xl">
          <m.h2
            className="font-display font-medium text-4xl md:text-5xl leading-[1.05] uppercase"
            style={{ width: 600, marginTop: -28 }}
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            will select the
            <br />
            best images and ideas
            <br />
            for you
          </m.h2>
          <m.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            <p className="text-white/55 text-[15px] leading-relaxed">
              Once upon a time, nestled in a quaint little town, there lived an author named Alice. She wasn&apos;t your typical writer; her stories weren&apos;t just ink on paper; they were portals to worlds beyond imagination. Alice had a peculiar gift — she could breathe life into her characters, making them dance off the pages and into the hearts of her readers.
            </p>
            <p className="text-white/55 text-[15px] leading-relaxed">
              Alice&apos;s love for storytelling began in her childhood. She would spend hours in her attic, surrounded by dusty old books, dreaming up adventures for her imaginary friends. As she grew older, her passion for writing only intensified. She studied literature at university, honing her craft and delving deeper into the mysteries of storytelling.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  )
}

/* ─── AllTypes ─── */
function AllTypes() {
  const projects = [
    { src: photoCar, alt: 'Company Photo', aspect: '4/5' as const, widthClass: 'w-[216px]', mtClass: 'md:mt-20' },
    { src: photoFieldsColor, alt: 'Landscape Series', aspect: '3/4' as const, widthClass: 'w-[220px]', mtClass: 'md:mt-[6.25rem]' },
    { src: photoGirlGrass, alt: 'Classy Photo Shoot', aspect: '4/5' as const, widthClass: 'w-[230px]', mtClass: 'md:mt-10' },
    { src: photoSculptureColor, alt: 'Photo Brand', aspect: '4/5' as const, widthClass: 'w-[200px]', mtClass: 'md:mt-4' },
  ]

  return (
    <section className={`relative ${MATTE} px-6 md:px-12 py-32 overflow-hidden`}>
      <StarField
        count={550}
        ring
        ringCount={260}
        ringRadiusFactor={0.37}
        ringBandWidth={50}
        className="absolute inset-0 pointer-events-none"
      />
      <LineField variant="projects" />
      <DecorativeImg
        src={noise}
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <m.h2
          className="font-display font-black text-5xl md:text-6xl uppercase leading-[0.95]"
          initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          All types of
          <br />
          projects
        </m.h2>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          <p className="text-white/55 text-[15px] max-w-md leading-relaxed">
            Welcome to the Innovation Hub: Where Ideas Take Shape. Explore the Intersection of Creativity and Technology. Dive Into Our Portfolio and Witness the Power of Ingenuity.
          </p>
          <span className="group mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-white/70">
            View the artwork
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </m.div>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <m.div
            key={project.src}
            className={`flex flex-col items-center ${project.mtClass}`}
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
          >
            <div className="overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] group">
              <PhotoImg
                src={project.src}
                alt={project.alt}
                className={`${project.widthClass} object-cover transition-transform duration-[1500ms] group-hover:scale-110`}
                style={{ aspectRatio: project.aspect }}
              />
            </div>
            <div className="text-center space-y-3 mt-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                {project.alt}
              </h3>
              <span className="inline-flex items-center gap-2 text-xs text-white/60 border border-white/15 rounded-full px-3 py-1.5 hover:bg-white/5 transition-colors cursor-default">
                photo shoot
                <span className="w-4 h-4 border border-white/20 rounded-full grid place-items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </span>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  )
}

/* ─── MechanicalMarvels ─── */
function MechanicalMarvels() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: bottomRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <section>
      <div className="relative px-6 md:px-12 pt-28 pb-12 overflow-hidden">
        <StarField count={450} className="absolute inset-0 pointer-events-none" />
        <LineField variant="marvels" />
        <DecorativeImg
          src={noise}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-overlay"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-10">
          <m.h2
            className="font-display font-medium uppercase text-5xl md:text-[90px] leading-[0.95] tracking-tight max-w-[1200px]"
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            Mechanical{' '}
            <span className="inline-flex items-center align-middle mx-1">
              <PhotoImg
                src={photoCamera}
                alt="Camera"
                className="h-10 md:h-20 w-auto rounded-md"
              />
            </span>{' '}
            Marvels: Unveiling the artistry of automation
          </m.h2>

          <div className="flex justify-between items-center mt-16 text-xs uppercase tracking-widest text-white/50">
            <span className="inline-flex items-center gap-2">
              View the artwork
              <MoveRight className="w-3.5 h-3.5" style={{ rotate: '-45deg' }} />
            </span>
            <span className="inline-flex items-center gap-2">
              Scroll to view more
              <MoveRight className="w-3.5 h-3.5" style={{ rotate: '90deg' }} />
            </span>
          </div>
        </div>
      </div>

      <div ref={bottomRef} className="relative h-[80vh] overflow-hidden">
        <m.div
          className="absolute inset-0"
          style={{ y: parallaxY, top: '-10%', bottom: '-10%', height: '120%' }}
        >
          <img
            src={getInTouchBg}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

        <LineField variant="marvelsBottom" />

        <div className="relative h-full grid place-items-center px-6 text-center">
          <div>
            <m.h3
              className="font-display font-black uppercase text-4xl md:text-7xl leading-[1] tracking-tight"
              initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              Get in touch to our
              <br />
              <span className="text-lime">Modern maintenance.</span>
            </m.h3>
            <div className="flex items-center justify-center gap-1">
              <m.a
                href="#"
                className="mt-10 inline-flex bg-white text-black rounded-full px-6 py-2 text-sm font-medium uppercase hover:bg-white/90 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                GET IN TOUCH
              </m.a>
              <m.div
                className="rounded-full border border-white flex items-center justify-center"
                style={{ width: 18.86, height: 18.53, marginTop: '4rem' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              >
                <VectorArrow />
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VectorArrow() {
  const [failed, setFailed] = useState(false)
  if (failed) return <ArrowUpRight className="w-[5.86px] h-[5.53px]" />
  return (
    <img
      src={vectorArrow}
      alt=""
      className="w-[5.86px] h-[5.53px]"
      onError={() => setFailed(true)}
      aria-hidden="true"
    />
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 md:px-12 py-6 flex items-center justify-between text-xs text-white/40">
      <span>All right reserved — 2024</span>
      <span className="text-white/40">
        Privacy Policy
      </span>
    </footer>
  )
}

/* ─── Main component ─── */
export default function ValmaxLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <LazyMotion features={domAnimation}>
        <IntroSequence />
        <TopBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <RalphHero />
        <OurPhotographer />
        <AllTypes />
        <MechanicalMarvels />
        <Footer />
      </LazyMotion>
    </div>
  )
}
