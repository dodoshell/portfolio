import { useTranslation } from 'react-i18next'

import { LanguageSwitch } from './LanguageSwitch'

const SECTIONS = ['about', 'timeline', 'skills', 'projects', 'contact'] as const

export function Nav(): React.JSX.Element {
  const { t } = useTranslation()

  return (
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
            <a href={`#${section}`} className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
              {t(`nav.${section}`)}
            </a>
          </li>
        ))}
      </ul>
      <LanguageSwitch />
    </nav>
  )
}
