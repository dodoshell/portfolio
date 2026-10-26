'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n/dictionaries'

// Swaps only the first path segment, so a case study opens in the other language.
export function LocaleSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname()
  const other: Locale = lang === 'en' ? 'it' : 'en'
  const href = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`)

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      className="rounded-full border border-nacre/20 bg-abyss/40 px-4 py-2 text-sm text-mist backdrop-blur-md transition-colors hover:border-iris/60 hover:text-nacre"
    >
      {label}
    </Link>
  )
}
