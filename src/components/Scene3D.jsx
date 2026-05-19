/**
 * Hero 3D scene: gaming bedroom (GLB) with React Three Fiber.
 *
 * Performance optimizations:
 * - Model compressed with meshopt + WebP textures (~3 MB, 85% smaller)
 * - Preloaded via useGLTF.preload (also in index.html)
 * - Lazy import from Hero.jsx (separate Three.js chunk)
 * - Draco decoder disabled (not needed for meshopt-only files)
 * - Mobile: no antialiasing, DPR 1, no floating animation or OrbitControls
 * - frameloop="demand" when hero is inactive or on mobile
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

const MODEL_URL = '/gaming_bedroom.glb'
// Drei's useGLTF: (path, useDraco, useMeshOpt, extendLoader)
// We compress with meshopt only, so we skip the Draco decoder fetch.
const USE_DRACO = false
const USE_MESHOPT = true

/** Loads the GLB model and auto-centers/scales it from its bounding box */
function GamingRoom({ animated = true }) {
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

  useFrame((state) => {
    if (!animated) return
    if (groupRef.current) {
      groupRef.current.position.y = baseY.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

/** Adjusts camera based on breakpoint (desktop vs mobile) */
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

function Scene({ orbitTarget, isDesktop }) {
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
      <pointLight position={[-0.2, -0.8, 0.2]}  intensity={1}   color="#4488ff"  distance={4}  decay={0.5} />
      <pointLight position={[0, -0.8,   0.5]}   intensity={1}   color="#ffaa44"  distance={4}  decay={0.5} />
      <pointLight position={[-4.4,   1, 1]}     intensity={2}   color="#22d3ee"  distance={4}  decay={1} />
      <pointLight position={[-3.2,   -1,  3]}   intensity={0}   color="#aabbff"  distance={8}  decay={2} />

      <Suspense fallback={null}>
        <GamingRoom animated={isDesktop} />
      </Suspense>

      {/* OrbitControls on desktop only — page scroll takes priority on mobile */}
      {isDesktop && (
        <OrbitControls
          ref={controlsRef}
          target={orbitTarget}
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      )}
    </>
  )
}

export default function Scene3D({ heroActive = true }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)

  useEffect(() => {
    let t
    const update = () => {
      clearTimeout(t)
      t = setTimeout(() => setIsDesktop(window.innerWidth >= 1024), 100)
    }
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('resize', update); clearTimeout(t) }
  }, [])

  const orbitTarget = useMemo(() => (isDesktop ? [-5, 0, 0] : [-2, -1.5, 1]), [isDesktop])
  const dpr = isDesktop ? [1, 1.5] : [1, 1]
  const shouldRenderContinuously = heroActive && isDesktop

  return (
    <div className={`w-full h-full ${!isDesktop ? 'pointer-events-none' : ''}`}>
      <Canvas
        camera={{ position: [1, 4, 15], fov: 45 }}
        gl={{ antialias: isDesktop, alpha: true, powerPreference: 'high-performance' }}
        dpr={dpr}
        frameloop={shouldRenderContinuously ? 'always' : 'demand'}
        performance={{ min: 0.5 }}
        style={!isDesktop ? { pointerEvents: 'none', touchAction: 'pan-y' } : undefined}
      >
        <Scene orbitTarget={orbitTarget} isDesktop={isDesktop} />
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_URL, USE_DRACO, USE_MESHOPT)
