import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useScrollLock } from '@/hooks/useScrollLock'

import { LanguageSwitch } from './LanguageSwitch'
import type { SectionId } from './Nav'

interface MobileMenuProps {
  sections: readonly SectionId[]
  activeSection: SectionId | ''
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => void
  onClose: () => void
}

export function MobileMenu({ sections, activeSection, onNavigate, onClose }: MobileMenuProps): React.JSX.Element {
  const { t } = useTranslation()
  const containerRef = useFocusTrap<HTMLDivElement>(true)
  useScrollLock(true)

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.openMenu')}
      className="fixed inset-0 z-[70] flex flex-col bg-[var(--color-bg)] px-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <LanguageSwitch />
        <button type="button" onClick={onClose} className="text-sm text-[var(--color-text-muted)]">
          {t('nav.close')}
        </button>
      </div>

      <ul className="mt-16 flex flex-1 flex-col justify-center gap-8 text-3xl">
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              onClick={(event) => onNavigate(event, section)}
              aria-current={activeSection === section ? 'true' : undefined}
              className="font-[var(--font-display)]"
            >
              {t(`nav.${section}`)}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
