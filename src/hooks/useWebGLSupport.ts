import { useState } from 'react'

import { useReducedMotion } from './useReducedMotion'

const MIN_LOGICAL_CORES = 4

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function hasEnoughCapability(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator.hardwareConcurrency ?? 0) >= MIN_LOGICAL_CORES && detectWebGL()
}

export function useWebGLSupport(): boolean {
  const reducedMotion = useReducedMotion()
  const [hasCapability] = useState(hasEnoughCapability)

  return hasCapability && !reducedMotion
}
