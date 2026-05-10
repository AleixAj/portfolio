import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, Suspense, useEffect } from 'react'
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

useGLTF.preload('/gaming_bedroom.glb')

function Scene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[-0.2, -0.8, 0]}  intensity={1}   color="#4488ff"  distance={3}  decay={1} />
      <pointLight position={[0, -0.8,   0.5]}   intensity={1}   color="#ffaa44"  distance={3}  decay={1} />
      <pointLight position={[-4.4,   1, 1]}     intensity={2}   color="#22d3ee"  distance={4}  decay={1.1} />
      <pointLight position={[2,   3,  -2]}     intensity={0.8} color="#aabbff"  distance={8}  decay={1} />

      <Suspense fallback={null}>
        <GamingRoom />
      </Suspense>

      <OrbitControls
        target={[-5, 0, 0]}
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [1, 4, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}