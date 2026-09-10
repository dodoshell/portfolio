import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useRef, type ReactNode } from 'react'

import { LenisContext } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps): React.JSX.Element {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) return

    const instance = new Lenis({ autoRaf: false })
    instance.on('scroll', ScrollTrigger.update)
    lenisRef.current = instance

    const update = (time: number): void => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      instance.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
