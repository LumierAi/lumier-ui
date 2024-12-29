// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'node:path'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/icon',
    'nuxt-typed-router',
  ],

  imports: {
    dirs: ['composables', 'utils', 'types/**'],
  },

  devtools: { enabled: true },

  css: [
    join(__dirname, './app/assets/fonts/font-face.css'),
    join(__dirname, './app/assets/typography/index.css'),
  ],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-12-22',
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler', // or "modern"
        },
      },
    },
  },

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
