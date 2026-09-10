import { Points, PointMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Points as PointsImpl } from 'three'

interface ParticleLayerProps {
  color: string
  size: number
  spread: number
  speed: number
}

function createPositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread
  }
  return positions
}

const PARTICLE_COUNT = 450

function ParticleLayer({ color, size, spread, speed }: ParticleLayerProps): React.JSX.Element {
  const ref = useRef<PointsImpl>(null)
  const positions = useMemo(() => createPositions(PARTICLE_COUNT, spread), [spread])

  useFrame((state, delta) => {
    const points = ref.current
    if (!points) return

    const targetRotX = state.pointer.y * 0.25
    const targetRotY = state.pointer.x * 0.25
    points.rotation.x += (targetRotX - points.rotation.x) * 0.04
    points.rotation.y += (targetRotY - points.rotation.y) * 0.04 + delta * speed
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial color={color} size={size} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </Points>
  )
}

interface HeroSceneProps {
  active: boolean
}

export default function HeroScene({ active }: HeroSceneProps): React.JSX.Element {
  return (
    <Canvas dpr={[1, 2]} frameloop={active ? 'always' : 'never'} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ParticleLayer color="#7c5cff" size={0.022} spread={9} speed={0.02} />
      <ParticleLayer color="#22d3ee" size={0.016} spread={7} speed={-0.014} />
    </Canvas>
  )
}
