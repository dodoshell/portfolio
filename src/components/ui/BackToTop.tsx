import clsx from 'clsx'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SHOW_THRESHOLD = 480

export function BackToTop(): React.JSX.Element {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const lenisRef = useLenis()
  const reducedMotion = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > SHOW_THRESHOLD)
  })

  const handleClick = (): void => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t('nav.backToTop')}
      tabIndex={visible ? 0 : -1}
      className={clsx(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-text)] transition-opacity duration-[var(--dur-fast)]',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
