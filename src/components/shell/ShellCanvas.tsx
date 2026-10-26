'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Color, MathUtils, type Mesh, type ShaderMaterial } from 'three'
import { getPalette } from './palettes'
import { fragmentShader, vertexShader } from './shaders'

type Section = { name: string | undefined; side: string | undefined; isFirst: boolean }

// The innermost [data-shell] element under the middle of the viewport decides
// the palette, so a project inside the work section wins over the section.
// data-shell-side moves the shell behind the screenshot instead of the text.
function currentSection(): Section {
  const middle = window.innerHeight / 2
  let match: HTMLElement | undefined
  for (const section of document.querySelectorAll<HTMLElement>('[data-shell]')) {
    const rect = section.getBoundingClientRect()
    if (rect.top <= middle && rect.bottom >= middle) match = section
  }
  const name = match?.dataset.shell
  return { name, side: match?.dataset.shellSide, isFirst: window.scrollY < window.innerHeight * 0.5 }
}

const colorCache = new Map<string, Color>()
const toColor = (hex: string) => {
  let color = colorCache.get(hex)
  if (!color) colorCache.set(hex, (color = new Color(hex)))
  return color
}

function Shell({ animate }: { animate: boolean }) {
  const mesh = useRef<Mesh>(null)
  const material = useRef<ShaderMaterial>(null)
  const pointer = useRef({ x: 0.4, y: 0.2 })
  const frame = useRef(0)
  const target = useRef({ palette: getPalette(undefined), side: undefined as string | undefined, isFirst: true })
  const { viewport } = useThree()

  const uniforms = useMemo(() => {
    const palette = getPalette(undefined)
    return {
      uTime: { value: 0 },
      uTurbulence: { value: palette.turbulence },
      uPointer: { value: [0.4, 0.2] },
      uFade: { value: 1 },
      uColorA: { value: new Color(palette.colors[0]) },
      uColorB: { value: new Color(palette.colors[1]) },
      uColorC: { value: new Color(palette.colors[2]) },
    }
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current || !material.current) return
    const u = material.current.uniforms

    if (frame.current++ % 8 === 0) {
      const section = currentSection()
      target.current = { palette: getPalette(section.name), side: section.side, isFirst: section.isFirst }
    }

    const { palette, side } = target.current
    const narrow = viewport.width < 6
    // On phones only the home hero has room above the text for a bright shell.
    const isFirst = target.current.isFirst && (!narrow || palette === getPalette('nacre'))
    const ease = 1 - Math.exp(-delta * 2.5)

    u.uTime.value = animate ? state.clock.elapsedTime : 4
    u.uTurbulence.value = MathUtils.lerp(u.uTurbulence.value, palette.turbulence, ease)
    u.uFade.value = MathUtils.lerp(u.uFade.value, isFirst ? 1 : narrow ? 0.22 : 0.32, ease)
    u.uColorA.value.lerp(toColor(palette.colors[0]), ease)
    u.uColorB.value.lerp(toColor(palette.colors[1]), ease)
    u.uColorC.value.lerp(toColor(palette.colors[2]), ease)

    const [px, py] = u.uPointer.value
    u.uPointer.value = [
      MathUtils.lerp(px, pointer.current.x, 1 - Math.exp(-delta * 3)),
      MathUtils.lerp(py, pointer.current.y, 1 - Math.exp(-delta * 3)),
    ]

    const restX = narrow ? 0 : side === 'left' ? -1.9 : side === 'right' ? 1.9 : palette.x
    mesh.current.position.x = MathUtils.lerp(mesh.current.position.x, restX, ease)
    mesh.current.position.y = MathUtils.lerp(mesh.current.position.y, narrow && isFirst ? viewport.height * 0.26 : 0, ease)
    mesh.current.scale.setScalar(narrow ? Math.min(1.05, viewport.width * 0.36) : 1.05)
    if (animate) {
      mesh.current.rotation.y += delta * 0.08
      mesh.current.rotation.x = MathUtils.lerp(mesh.current.rotation.x, pointer.current.y * 0.25, ease)
    }
  })

  return (
    <mesh ref={mesh} position={[1.6, 0, 0]} scale={1.05}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default function ShellCanvas({ animate }: { animate: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={animate ? 'always' : 'demand'}
    >
      <Shell animate={animate} />
    </Canvas>
  )
}
