// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'node:path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/eslint'],

  imports: {
    dirs: ['composables', 'utils', 'types/**'],
  },

  devtools: { enabled: true },

  css: [
    join(__dirname, './assets/fonts/font-face.css'),
    join(__dirname, './assets/typography/index.css'),
  ],

  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      baseApiUrl: process.env.BASE_API_URL || '',
    },
  },

  compatibilityDate: '2024-12-22',

  typescript: {
    typeCheck: true,
    tsConfig: {
      include: ['types/**/*.d.ts'],
    },
    includeWorkspace: true,
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  fonts: {
    defaults: {
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin-ext', 'latin'],
    },
  },

  tailwindcss: {
    configPath: 'tailwind.config',
  },
})
