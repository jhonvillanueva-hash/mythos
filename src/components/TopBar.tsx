import { useState } from 'react'
import { m } from 'framer-motion'
import logo from '@/assets/logo.svg'

export default function TopBar({ introDelay }: { introDelay: number }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <m.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: introDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          {logoFailed ? (
            <span className="font-display font-black text-white text-xl">VALMAX</span>
          ) : (
            <img src={logo} alt="VALMAX" className="h-6 w-auto" onError={() => setLogoFailed(true)} />
          )}
        </m.a>

        <m.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: introDelay, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setMenuOpen((v) => !v)}
          className="border border-white/15 rounded-full px-4 py-2 text-xs text-white/50 bg-white/3 hover:border-white/30 hover:text-white/70 transition-colors"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          Menu
        </m.button>
      </div>

      {menuOpen && (
        <div className="absolute right-6 md:right-10 mt-3 w-48 border border-white/15 rounded-xl bg-background/90 backdrop-blur-xl shadow-xl overflow-hidden">
          <nav className="flex flex-col">
            {['About', 'Contact', 'Projects'].map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setMenuOpen(false)}
                className={`text-left px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors ${i < 2 ? 'border-b border-white/5' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
