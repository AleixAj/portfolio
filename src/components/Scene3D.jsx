/**
 * Hero 3D scene: gaming bedroom (GLB) with React Three Fiber.
 *
 * Quality / performance balance:
 * - Model: meshopt-compressed + WebP textures (~3 MB, 85% smaller than raw GLB).
 * - DPR: device pixel ratio capped at 2 (mobile) / 1.5 (desktop). Adaptive via
 *   PerformanceMonitor — drops automatically if FPS falls below ~45.
 * - Antialiasing enabled everywhere; the DPR caps keep the pixel budget sane.
 * - Floating animation only runs when the user is not actively orbiting,
 *   so dragging feels immediate and never fights the idle motion.
 * - Mobile has no OrbitControls so page scroll wins, and frameloop is
 *   "demand" (renders only on resize / state change).
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei'
import { memo, useRef, Suspense, useEffect, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'

const MODEL_URL = '/gaming_bedroom.glb'
// Drei's useGLTF: (path, useDraco, useMeshOpt, extendLoader)
// We compress with meshopt only, so we skip the Draco decoder fetch.
const USE_DRACO = false
const USE_MESHOPT = true

/** Loads the GLB and auto-centers/scales it from its bounding box. */
function GamingRoom({ floatingRef }) {
  const { scene } = useGLTF(MODEL_URL, USE_DRACO, USE_MESHOPT)
  const groupRef = useRef()
  const baseY = useRef(0)

  useEffect(() => {
    if (!scene || !groupRef.current) return
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 5 / maxDim
    groupRef.current.scale.setScalar(scale)
    baseY.current = -center.y * scale
    groupRef.current.position.set(-center.x * scale, baseY.current, -center.z * scale)
    groupRef.current.rotation.y = -0.6
  }, [scene])

  // Idle float runs on desktop AND mobile. It animates smoothly because the hero
  // canvas uses frameloop="always" while the hero is on screen (see Scene3D below);
  // the old mobile "demand" jumpiness no longer applies. On mobile there is no
  // OrbitControls, so the float never has to yield to a drag.
  useFrame((state) => {
    if (!groupRef.current) return
    if (floatingRef && floatingRef.current === false) return
    groupRef.current.position.y = baseY.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

/** Adjusts the camera based on the breakpoint (desktop vs mobile). */
function CameraController({ isDesktop, cameraTarget }) {
  const { camera } = useThree()
  useEffect(() => {
    const [x, y, z] = isDesktop ? [1, 4, 15] : [1, 3, 18]
    camera.position.set(x, y, z)
    camera.lookAt(...cameraTarget)
    camera.updateProjectionMatrix()
  }, [camera, cameraTarget, isDesktop])
  return null
}

function Scene({ orbitTarget, isDesktop, floatingRef }) {
  const controlsRef = useRef()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...orbitTarget)
      controlsRef.current.update()
    }
  }, [orbitTarget])

  return (
    <>
      <CameraController isDesktop={isDesktop} cameraTarget={orbitTarget} />
      <ambientLight intensity={0.05} />
      <pointLight position={[-0.2, -0.8, 0.2]} intensity={1} color="#4488ff" distance={4} decay={0.5} />
      <pointLight position={[0, -0.8, 0.5]}    intensity={1} color="#ffaa44" distance={4} decay={0.5} />
      <pointLight position={[-4.4, 1, 1]}      intensity={2} color="#22d3ee" distance={4} decay={1} />

      <Suspense fallback={null}>
        <GamingRoom floatingRef={floatingRef} />
      </Suspense>

      {/* OrbitControls only on desktop — on mobile, page scroll wins. */}
      {isDesktop && (
        <OrbitControls
          ref={controlsRef}
          target={orbitTarget}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.15}
          rotateSpeed={0.9}
          onStart={() => { if (floatingRef) floatingRef.current = false }}
          onEnd={() => { if (floatingRef) floatingRef.current = true }}
        />
      )}
    </>
  )
}

/** Caps to a sensible DPR for the device class. */
function getInitialDpr(isDesktop) {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  // Mobile screens are small in pixel count even at DPR 3, so we can afford 2x.
  // Desktop monitors can be 4K, so cap at 1.5x.
  return Math.min(dpr, isDesktop ? 1.5 : 2)
}

// Memoized so parent re-renders that do not change `heroActive` (e.g. the rotating
// hero word in App.jsx every 2.5s) don't propagate into the Canvas tree and
// trigger spurious R3F invalidations that would step the idle animation.
const Scene3D = memo(function Scene3D({ heroActive = true }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)
  const [dpr, setDpr] = useState(() => getInitialDpr(window.innerWidth >= 1024))
  const floatingRef = useRef(true)

  useEffect(() => {
    let t
    const update = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        const next = window.innerWidth >= 1024
        setIsDesktop(next)
        setDpr(getInitialDpr(next))
      }, 100)
    }
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('resize', update); clearTimeout(t) }
  }, [])

  const orbitTarget = useMemo(() => (isDesktop ? [-5, 0, 0] : [-2, -1.5, 1]), [isDesktop])
  // Render continuously (for the idle float) on desktop AND mobile while the hero
  // is on screen. When the user scrolls away, heroActive=false drops back to
  // "demand" so we don't waste battery rendering an off-screen canvas.
  const shouldRenderContinuously = heroActive

  // Stable references so PerformanceMonitor doesn't see new props on every render.
  const onDecline = useCallback(() => {
    setDpr(d => Math.max(1, +(d - 0.25).toFixed(2)))
  }, [])
  const onIncline = useCallback(() => {
    setDpr(getInitialDpr(isDesktop))
  }, [isDesktop])

  return (
    <div className={`w-full h-full ${!isDesktop ? 'pointer-events-none' : ''}`}>
      <Canvas
        camera={{ position: [1, 4, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
        dpr={dpr}
        frameloop={shouldRenderContinuously ? 'always' : 'demand'}
        style={!isDesktop ? { pointerEvents: 'none', touchAction: 'pan-y' } : undefined}
      >
        {/* Adaptive DPR: drops if FPS falls under ~45, recovers when stable. */}
        <PerformanceMonitor
          onDecline={onDecline}
          onIncline={onIncline}
          flipflops={3}
          factor={1}
        />
        <Scene orbitTarget={orbitTarget} isDesktop={isDesktop} floatingRef={floatingRef} />
      </Canvas>
    </div>
  )
})

export default Scene3D

useGLTF.preload(MODEL_URL, USE_DRACO, USE_MESHOPT)
