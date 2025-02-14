import type { I18nMessagesKeys } from '~~/i18n/I18nMessages'

export default function useT(key: I18nMessagesKeys): string {
  const { t } = useI18n()

  return t(key)
}
