import type { I18nUiMessagesKeys } from '../../i18n/I18nUiMessages'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$ut = (key: I18nUiMessagesKeys) => {
    const { t } = useI18n()
    return t(key)
  }
})
