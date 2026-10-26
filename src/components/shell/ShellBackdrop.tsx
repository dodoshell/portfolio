'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const ShellCanvas = dynamic(() => import('./ShellCanvas'), { ssr: false })

type Mode = 'pending' | 'static' | 'still' | 'live'

let detected: Mode | undefined

function detectMode(): Mode {
  if (detected) return detected
  const canvas = document.createElement('canvas')
  const hasWebGL = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  if (!hasWebGL) detected = 'static'
  // Weak devices keep the static picture: a stuttering hero is worse than none.
  else if ((navigator.hardwareConcurrency ?? 8) < 4) detected = 'static'
  else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) detected = 'still'
  else detected = 'live'
  return detected
}

const subscribe = () => () => {}

// The gradient is the same shell drawn in CSS. It shows while the canvas
// loads and stays as the whole effect where WebGL isn't worth it.
export function ShellBackdrop() {
  const mode = useSyncExternalStore(subscribe, detectMode, () => 'pending' as Mode)
  const hasCanvas = mode === 'live' || mode === 'still'

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute top-[12%] right-[-12%] size-[min(70vw,640px)] rounded-full bg-[conic-gradient(from_120deg,#a898ff,#7fe3d6,#f4a8c8,#a898ff)] blur-[90px] transition-opacity duration-[1500ms] max-md:top-[2%] max-md:right-[-30%] ${hasCanvas ? 'opacity-0' : 'opacity-50'}`}
      />
      {hasCanvas && (
        <div className="shell-fade-in absolute inset-0">
          <ShellCanvas animate={mode === 'live'} />
        </div>
      )}
    </div>
  )
}
