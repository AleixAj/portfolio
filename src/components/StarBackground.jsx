import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={300} depth={60} count={8000} factor={7} saturation={0} fade />
      </Canvas>
    </div>
  )
}
