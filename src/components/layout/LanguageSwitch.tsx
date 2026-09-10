import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n'

export function LanguageSwitch(): React.JSX.Element {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {SUPPORTED_LANGUAGES.map((lang: SupportedLanguage) => (
        <button
          key={lang}
          type="button"
          onClick={() => void i18n.changeLanguage(lang)}
          aria-pressed={current === lang}
          className={clsx(
            'rounded-full px-2 py-1 text-sm uppercase transition-colors duration-[var(--dur-fast)]',
            current === lang ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
