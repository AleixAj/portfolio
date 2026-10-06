/**
 * The 3D gaming room in the hero (React Three Fiber).
 *
 * A few things to keep it smooth:
 * - The model is compressed with meshopt + WebP textures (about 3 MB).
 * - Resolution is capped (1.5x on desktop, 2x on mobile) and drops on its own
 *   if the frame rate falls, thanks to PerformanceMonitor.
 * - It only renders every frame while the hero is on screen.
 * - On mobile you can't drag it, so swiping always scrolls the page.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei'
import { memo, useRef, Suspense, useEffect, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'

const MODEL_URL = '/gaming_bedroom.glb'
// useGLTF(path, useDraco, useMeshOpt). The model only uses meshopt,
// so there's no need to download the Draco decoder.
const USE_DRACO = false
const USE_MESHOPT = true

// Loads the model, then centres and scales it based on its bounding box
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

  // Slow up-and-down float. It pauses while the user is dragging the room.
  useFrame((state) => {
    if (!groupRef.current || !floatingRef.current) return
    groupRef.current.position.y = baseY.current + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// Different camera position for desktop and mobile
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

// Desktop only: shifts the whole image to the right so the room sits next to
// the hero text instead of behind it. A view offset moves the picture without
// touching the camera, so the angle and the drag pivot stay the same.
function ViewShift() {
  const { camera, size } = useThree()
  useEffect(() => {
    // Puts the room's centre at roughly 72% of the width. The camera framing
    // already pushes it right by about 21% of the height, so I subtract that.
    const shift = Math.max(0, Math.round(size.width * 0.22 - size.height * 0.21))
    camera.setViewOffset(size.width, size.height, -shift, 0, size.width, size.height)
    camera.updateProjectionMatrix()
    return () => {
      camera.clearViewOffset()
      camera.updateProjectionMatrix()
    }
  }, [camera, size.width, size.height])
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
      {isDesktop && <ViewShift />}
      <ambientLight intensity={0.05} />
      <pointLight position={[-0.2, -0.8, 0.2]} intensity={1} color="#4488ff" distance={4} decay={0.5} />
      <pointLight position={[0, -0.8, 0.5]}    intensity={1} color="#ffaa44" distance={4} decay={0.5} />
      <pointLight position={[-4.4, 1, 1]}      intensity={2} color="#22d3ee" distance={4} decay={1} />

      <Suspense fallback={null}>
        <GamingRoom floatingRef={floatingRef} />
      </Suspense>

      {/* Drag to rotate, desktop only (on mobile the swipe has to scroll the page) */}
      {isDesktop && (
        <OrbitControls
          ref={controlsRef}
          target={orbitTarget}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.15}
          rotateSpeed={0.9}
          onStart={() => { floatingRef.current = false }}
          onEnd={() => { floatingRef.current = true }}
        />
      )}
    </>
  )
}

// Phones have few pixels even at 3x, so 2x is affordable there.
// Desktop screens can be 4K, so they're capped at 1.5x.
function getInitialDpr(isDesktop) {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  return Math.min(dpr, isDesktop ? 1.5 : 2)
}

// memo so the hero re-rendering (the rotating word changes every 2.5 s)
// doesn't reach the canvas unless heroActive actually changed.
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

  // If the frame rate drops, lower the resolution a bit; when it recovers, go back.
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
        // Every frame while the hero is visible, otherwise only when something changes
        frameloop={heroActive ? 'always' : 'demand'}
        style={!isDesktop ? { pointerEvents: 'none', touchAction: 'pan-y' } : undefined}
      >
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
