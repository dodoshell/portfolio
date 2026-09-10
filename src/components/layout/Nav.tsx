import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useActiveSection } from '@/hooks/useActiveSection'
import { useLenis } from '@/hooks/useLenis'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

import { LanguageSwitch } from './LanguageSwitch'
import { MobileMenu } from './MobileMenu'

const SECTIONS = ['about', 'timeline', 'skills', 'projects', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]

const NAV_OFFSET = -88

export function Nav(): React.JSX.Element {
  const { t } = useTranslation()
  const lenisRef = useLenis()
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const activeSection = useActiveSection(SECTIONS)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const progress = reducedMotion ? scrollYProgress : smoothProgress

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId): void => {
    setMenuOpen(false)
    const lenis = lenisRef.current
    if (!lenis) return
    event.preventDefault()
    lenis.scrollTo(`#${id}`, { offset: NAV_OFFSET })
  }

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-[var(--color-text)]"
      >
        <a href="#top" className="font-[var(--font-display)] text-lg font-semibold" aria-label="Odoardo Ramanucci">
          OR
        </a>

        <ul className="hidden items-center gap-6 text-sm md:flex">
          {SECTIONS.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                onClick={(event) => handleNavClick(event, section)}
                aria-current={activeSection === section ? 'true' : undefined}
                className={
                  activeSection === section
                    ? 'text-[var(--color-text)]'
                    : 'text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]'
                }
              >
                {t(`nav.${section}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <LanguageSwitch />
        </div>

        {!isDesktop && (
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            className="relative h-8 w-8"
          >
            <span className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1 bg-current" />
            <span className="absolute inset-x-1 top-1/2 h-0.5 translate-y-1 bg-current" />
          </button>
        )}
      </nav>

      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-[var(--color-border)]" aria-hidden="true">
        <motion.div className="h-full origin-left bg-[var(--color-accent)]" style={{ scaleX: progress }} />
      </div>

      <AnimatePresence>
        {menuOpen && !isDesktop && (
          <MobileMenu
            sections={SECTIONS}
            activeSection={activeSection}
            onNavigate={handleNavClick}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
