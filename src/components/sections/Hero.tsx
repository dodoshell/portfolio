import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import { useInView } from '@/hooks/useInView'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const OBSERVER_OPTIONS: IntersectionObserverInit = { threshold: 0 }

export function Hero(): React.JSX.Element {
  const { t } = useTranslation()
  const webglSupported = useWebGLSupport()
  const [sectionRef, inView] = useInView<HTMLElement>(OBSERVER_OPTIONS)

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-dvh scroll-mt-20 flex-col justify-center overflow-hidden px-6"
    >
      <div className="hero-gradient absolute inset-0 -z-10" />

      {webglSupported && (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene active={inView} />
          </Suspense>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="[font-family:var(--font-display)] text-[length:var(--fs-hero)] leading-[1.05]">
          Odoardo Ramanucci
        </h1>
        <p className="mt-4 text-lg">{t('hero.role')}</p>
        <p className="mt-2 text-[var(--color-text-muted)]">{t('hero.stack')}</p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t('hero.location')}</p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
        {t('hero.scrollHint')}
      </div>
    </section>
  )
}
