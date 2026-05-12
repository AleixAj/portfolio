import { Canvas, useFrame } from '@react-three/fiber'
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


function Scene({ orbitTarget }) {
  const controlsRef = useRef()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...orbitTarget)
      controlsRef.current.update()
    }
  }, [orbitTarget])

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[-0.2, -0.8, 0.2]}  intensity={1}   color="#4488ff"  distance={4}  decay={0.5} />
      <pointLight position={[0, -0.8,   0.5]}   intensity={1}   color="#ffaa44"  distance={4}  decay={0.5} />
      <pointLight position={[-4.4,   1, 1]}     intensity={2}   color="#22d3ee"  distance={4}  decay={1} />
      <pointLight position={[-3.2,   -1,  3]}     intensity={0} color="#aabbff"  distance={8}  decay={2} />

      <Suspense fallback={null}>
        <GamingRoom />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        target={orbitTarget}
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export default function Scene3D() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const orbitTarget = isDesktop ? [-5, 0, 0] : [-3, 0, 0]

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [1, 4, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene orbitTarget={orbitTarget} />
      </Canvas>
    </div>
  )
}
