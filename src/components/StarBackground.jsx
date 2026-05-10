import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useMemo } from 'react'

function rnd(min, max) { return Math.random() * (max - min) + min }

export default function StarBackground() {
  const shootingStars = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      top:      rnd(5, 65),
      left:     rnd(5, 70),
      width:    rnd(50, 110),
      angle:    rnd(15, 65),
      flipX:    Math.random() > 0.5,
      duration: rnd(8, 16),
      delay:    rnd(0, 16),
    }))
  , [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 1] }}>
        <Stars radius={300} depth={60} count={8000} factor={7} saturation={0} fade />
      </Canvas>

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
