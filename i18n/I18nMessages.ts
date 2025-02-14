import type { DotNotation } from '~~/types'
import type pl from './locales/pl'

export type I18nMessages = typeof pl

export type I18nMessagesKeys = DotNotation<I18nMessages>
