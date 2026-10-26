import Link from 'next/link'
import type { Dictionary, Locale } from '@/i18n/dictionaries'
import { LocaleSwitch } from './LocaleSwitch'

const anchors = ['work', 'upstream', 'process', 'contact'] as const

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary['nav'] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          href={`/${lang}`}
          className="display grid size-10 place-items-center rounded-full border border-nacre/20 bg-abyss/40 text-lg font-bold backdrop-blur-md transition-colors hover:border-iris/60"
          aria-label="dodoshell"
        >
          ds
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-nacre/10 bg-abyss/40 px-2 py-1 text-sm backdrop-blur-md md:flex">
          {anchors.map((anchor) => (
            <li key={anchor}>
              <Link
                href={`/${lang}#${anchor}`}
                className="block rounded-full px-4 py-2 text-mist transition-colors hover:text-nacre"
              >
                {dict[anchor]}
              </Link>
            </li>
          ))}
        </ul>
        <LocaleSwitch lang={lang} label={dict.otherLocale} />
      </nav>
    </header>
  )
}
