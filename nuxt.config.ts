// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'node:path'
import { JasnePreset } from './app/constants/PrimeTheme'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/eslint', '@primevue/nuxt-module', '@nuxt/icon', 'nuxt-typed-router'],

  imports: {
    dirs: ['composables', 'utils', 'types/**'],
  },

  devtools: { enabled: true },

  css: [
    join(__dirname, './app/assets/fonts/font-face.css'),
    join(__dirname, './app/assets/typography/index.css'),
  ],

  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      baseApiUrl: process.env.BASE_API_URL || '',
    },
  },

  future: {
    compatibilityVersion: 4,
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

  primevue: {
    options: {
      theme: {
        preset: JasnePreset,
        options: {
          prefix: 'p',
        },
      },
    },
  },

  tailwindcss: {
    configPath: 'tailwind.config',
  },
})
