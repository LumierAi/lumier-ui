import type { I18nMessages } from './I18nMessages'
import type { Locale } from './locales'
import en from './locales/en'
import pl from './locales/pl'

export const i18nMessages: Record<Locale, I18nMessages> = {
  pl,
  en,
}
