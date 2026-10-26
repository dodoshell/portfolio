import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { ShellBackdrop } from '@/components/shell/ShellBackdrop'
import { getDictionary, isLocale, locales } from '@/i18n/dictionaries'
import { siteUrl } from '@/lib/site'
import '../globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: '%s · dodoshell' },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', it: '/it', 'x-default': '/en' },
    },
    openGraph: { type: 'website', siteName: 'dodoshell', locale: lang === 'it' ? 'it_IT' : 'en_US' },
  }
}

export const viewport: Viewport = {
  themeColor: '#060914',
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <html lang={lang} className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-nacre focus:px-4 focus:py-2 focus:text-abyss"
        >
          {lang === 'it' ? 'Vai al contenuto' : 'Skip to content'}
        </a>
        <ShellBackdrop />
        <Nav lang={lang} dict={dict.nav} />
        <main id="main">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  )
}
