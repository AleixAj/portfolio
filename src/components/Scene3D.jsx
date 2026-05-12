import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'

function GamingRoom() {
  const { scene } = useGLTF('/gaming_bedroom.glb')
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

function CameraController({ isDesktop }) {
  const { camera } = useThree()
  useEffect(() => {
    const [x, y, z] = isDesktop ? [1, 4, 15] : [-1, 3, 18]
    camera.position.set(x, y, z)
    camera.updateProjectionMatrix()
  }, [camera, isDesktop])
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
      <CameraController isDesktop={isDesktop} />
      <ambientLight intensity={0.05} />
      <pointLight position={[-0.2, -0.8, 0.2]}  intensity={1}   color="#4488ff"  distance={4}  decay={0.5} />
      <pointLight position={[0, -0.8,   0.5]}   intensity={1}   color="#ffaa44"  distance={4}  decay={0.5} />
      <pointLight position={[-4.4,   1, 1]}     intensity={2}   color="#22d3ee"  distance={4}  decay={1} />
      <pointLight position={[-3.2,   -1,  3]}   intensity={0}   color="#aabbff"  distance={8}  decay={2} />

      <Suspense fallback={null}>
        <GamingRoom />
      </Suspense>

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

  const orbitTarget = isDesktop ? [-5, 0, 0] : [-2, -1.5, 1]

  return (
    <div className={`w-full h-full ${!isDesktop ? 'pointer-events-none' : ''}`}>
      <Canvas
        camera={{ position: [1, 4, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={heroActive ? 'always' : 'demand'}
        performance={{ min: 0.5 }}
        style={!isDesktop ? { pointerEvents: 'none', touchAction: 'pan-y' } : undefined}
      >
        <Scene orbitTarget={orbitTarget} isDesktop={isDesktop} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/gaming_bedroom.glb')
