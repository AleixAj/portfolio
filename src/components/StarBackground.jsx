/**
 * Static star background for the full page.
 *
 * Performance strategy:
 * - Canvas runs in frameloop="demand" — renders once on mount and on resize,
 *   never per frame. This frees the GPU for the hero 3D scene and keeps the
 *   PC interaction smooth even when both layers are visible.
 * - Movement comes from CSS-animated shooting stars (no WebGL cost).
 *
 * Uses seeded PRNG so positions are deterministic across reloads.
 */
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useMemo } from 'react'

function seededUnit(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function rnd(seed, min, max) {
  return seededUnit(seed) * (max - min) + min
}

function StaticStarField({ count = 6500 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 300
      const theta = seededUnit(i + 1) * Math.PI * 2
      const phi = Math.acos(2 * seededUnit(i + 1001) - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.45} color="white" sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}

export default function StarBackground() {
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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power', stencil: false, depth: false }}
      >
        <StaticStarField count={6500} />
        <Stars radius={300} depth={60} count={1500} factor={7} saturation={0} fade />
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
