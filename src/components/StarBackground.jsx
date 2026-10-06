/**
 * Starry background behind the whole page.
 *
 * It's a plain 2D canvas, drawn once and redrawn only when the window size
 * changes. It used to be a second Three.js scene, which was overkill for
 * something that doesn't move. The only movement is the shooting stars, and
 * those are CSS animations.
 *
 * Positions come from a seeded random function, so the sky looks the same on every visit.
 */
import { useEffect, useMemo, useRef } from 'react'

function seededUnit(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function rnd(seed, min, max) {
  return seededUnit(seed) * (max - min) + min
}

// Stars per million pixels: about 1900 on a 1440x900 screen, 600 on a phone
const DENSITY = 1450

function drawStars(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  const count = Math.round((w * h / 1e6) * DENSITY)
  for (let i = 0; i < count; i++) {
    const x = seededUnit(i + 1) * w
    const y = seededUnit(i + 5001) * h
    const t = seededUnit(i + 9001)
    // Most stars are tiny and faint, a few are bigger and brighter,
    // and some are slightly cyan so it doesn't look flat grey.
    const r = t > 0.985 ? 1.25 : t > 0.9 ? 0.9 : 0.55
    const a = t > 0.985 ? 0.95 : 0.25 + seededUnit(i + 13001) * 0.5
    ctx.fillStyle = seededUnit(i + 17001) > 0.94
      ? `rgba(165, 243, 252, ${a})`
      : `rgba(255, 255, 255, ${a})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function StarBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawStars(canvas)

    // On phones the address bar hiding/showing fires resize too. Only redraw
    // when the width really changed (or the canvas got too short).
    let lastW = window.innerWidth
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (Math.abs(window.innerWidth - lastW) < 2 && canvas.height >= window.innerHeight) return
        lastW = window.innerWidth
        drawStars(canvas)
      }, 150)
    }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize) }
  }, [])

  const shootingStars = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      top:      rnd(i + 10, 5, 65),
      left:     rnd(i + 20, 5, 70),
      width:    rnd(i + 30, 50, 110),
      angle:    rnd(i + 40, 15, 65),
      flipX:    seededUnit(i + 50) > 0.5,
      duration: rnd(i + 60, 8, 16),
      delay:    rnd(i + 70, 0, 16),
    }))
  , [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 overflow-hidden">
        {shootingStars.map(s => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              top:  `${s.top}%`,
              left: `${s.left}%`,
              transform: `rotate(${s.angle}deg) ${s.flipX ? 'scaleX(-1)' : ''}`,
            }}
          >
            <div style={{
              width:      `${s.width}px`,
              height:     '1.5px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85))',
              borderRadius: '100%',
              animation:  `shootingStar ${s.duration}s ${s.delay}s linear infinite`,
              opacity: 0,
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}
