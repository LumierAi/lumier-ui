// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../'],
  modules: ['@nuxt/icon'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',

  icon: {
    provider: 'server',
    collections: ['tabler'],
  },
})
