import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const EMAIL = 'oramanucci@protonmail.com'
const GITHUB_URL = 'https://github.com/dodoshell'
const LINKEDIN_URL = 'https://linkedin.com/in/odoardo-ramanucci'

export function Contact(): React.JSX.Element {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 px-6 py-24">
      <h2 id="contact-heading" className="font-[var(--font-display)] text-[length:var(--fs-h2)]">
        {t('contact.heading')}
      </h2>
      <p className="mt-4 text-[var(--color-text-muted)]">{t('contact.intro')}</p>

      <button
        type="button"
        onClick={() => void handleCopy()}
        className="mt-8 block text-left font-[var(--font-display)] text-[length:var(--fs-h2)] transition-colors hover:text-[var(--color-accent)]"
        aria-label={t('contact.copy')}
      >
        {EMAIL}
      </button>
      <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-[var(--color-accent)]">
        {copied ? t('contact.copied') : null}
      </p>

      <div className="mt-6 flex gap-6 text-sm">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {t('contact.github')}
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          {t('contact.linkedin')}
        </a>
      </div>
    </section>
  )
}
