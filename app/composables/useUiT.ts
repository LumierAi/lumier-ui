import type { I18nUiMessagesKeys } from '../../i18n/I18nUiMessages'

export default function useUiT(key: I18nUiMessagesKeys): string {
  const { t } = useI18n()

  return t(key)
}
