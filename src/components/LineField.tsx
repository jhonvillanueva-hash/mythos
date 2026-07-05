import { motion } from 'framer-motion'

type Variant = 'hero' | 'photographer' | 'projects' | 'marvels' | 'marvelsBottom'

interface LineFieldProps {
  variant?: Variant
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const LINE_CONFIG: Record<Variant, { lines: [number, number, number, number][]; marker?: { lineIndex: number; t: number; label: string }[] }> = {
  hero: {
    lines: [
      [0, 0, 22, 100],
      [50, 0, 82, 100],
      [100, 0, 58, 100],
      [0, 35, 100, 80],
      [100, 10, 0, 70],
      [30, 0, 100, 55],
    ],
    marker: [
      { lineIndex: 1, t: 0.38, label: '48768 gytsdactfj (7645t5.87)' },
      { lineIndex: 3, t: 0.62, label: '21094 hjkpoplmn (3321q8.14)' },
      { lineIndex: 5, t: 0.28, label: '90213 vbnxzlkj (5512w2.06)' },
    ],
  },
  photographer: {
    lines: [
      [22, 0, 14, 100],
      [58, 0, 48, 100],
      [82, 0, 86, 100],
      [0, 20, 100, 90],
      [100, 15, 0, 80],
    ],
    marker: [
      { lineIndex: 0, t: 0.55, label: '33910 plkmnbvx (2287r1.92)' },
      { lineIndex: 3, t: 0.72, label: '67452 qwertyui (8841p3.45)' },
    ],
  },
  projects: {
    lines: [
      [14, 0, 28, 100],
      [48, 0, 64, 100],
      [86, 0, 92, 100],
      [0, 30, 100, 75],
      [100, 5, 0, 90],
    ],
    marker: [
      { lineIndex: 1, t: 0.41, label: '10248 zxcvbnma (6634k9.27)' },
      { lineIndex: 4, t: 0.58, label: '84210 mnbvcxlk (1192s7.63)' },
      { lineIndex: 2, t: 0.83, label: '57023 asdfghjk (4458d2.81)' },
    ],
  },
  marvels: {
    lines: [
      [28, 0, 18, 100],
      [64, 0, 50, 100],
      [92, 0, 80, 100],
      [0, 15, 100, 85],
    ],
  },
  marvelsBottom: {
    lines: [
      [10, 30, 45, 35],
      [55, 28, 92, 32],
      [8, 55, 40, 58],
      [60, 62, 90, 60],
      [20, 78, 80, 82],
    ],
  },
}

function midpoint(x1: number, y1: number, x2: number, y2: number): string {
  return `${(x1 + x2) / 2}% ${(y1 + y2) / 2}%`
}

export default function LineField({ variant = 'hero' }: LineFieldProps) {
  const config = LINE_CONFIG[variant]
  const isMarvelsBottom = variant === 'marvelsBottom'
  const withMarkers = !isMarvelsBottom && variant !== 'marvels' && config.marker

  return (
    <svg
      className="absolute inset-0 pointer-events-none select-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {config.lines.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth={0.08}
          strokeOpacity={isMarvelsBottom ? 0.22 : 0.1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.4,
            delay: i * 0.12,
            ease: EASE,
          }}
          style={{ transformOrigin: midpoint(x1, y1, x2, y2) }}
        />
      ))}

      {withMarkers &&
        config.marker.map((m, i) => {
          const [x1, y1, x2, y2] = config.lines[m.lineIndex]
          const mx = x1 + (x2 - x1) * m.t
          const my = y1 + (y2 - y1) * m.t

          const labelParts = m.label.split(' ')
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1.2 + i * 0.25,
                ease: EASE,
              }}
              style={{ transformOrigin: `${mx}% ${my}%` }}
            >
              <circle cx={`${mx}%`} cy={`${my}%`} r={0.18} fill="white" opacity={0.95} />
              <text
                x={`${mx + 0.5}%`}
                y={`${my - 0.6}%`}
                fill="white"
                fillOpacity={0.55}
                fontSize={0.5}
                fontFamily="ui-monospace, monospace"
                letterSpacing={0.02}
              >
                {labelParts.map((part, pi) => (
                  <tspan key={pi} x={`${mx + 0.5}%`} dy={pi === 0 ? 0 : '0.7em'}>
                    {part}
                  </tspan>
                ))}
              </text>
            </motion.g>
          )
        })}
    </svg>
  )
}
