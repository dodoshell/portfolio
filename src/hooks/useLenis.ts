import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export const LenisContext = createContext<{ current: Lenis | null }>({ current: null })

export function useLenis(): { current: Lenis | null } {
  return useContext(LenisContext)
}
