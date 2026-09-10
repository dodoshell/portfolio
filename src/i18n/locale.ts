import type { SupportedLanguage } from './index'

export function resolveLocale(language: string): SupportedLanguage {
  return language.startsWith('it') ? 'it' : 'en'
}
