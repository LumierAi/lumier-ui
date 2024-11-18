// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
  ],
  imports: {
    dirs: [
      'types/**'
    ]
  },
  fonts: {
    defaults: {
      weights: [400, 600],
      styles: ['normal'],
      subsets: [
        'latin-ext',
        'latin',
      ],
    },
  },
  tailwindcss: {
    configPath: 'tailwind.config',
  },
  devtools: { enabled: true },
  css: [
    join(currentDir, './assets/fonts/font-face.css'),
    join(currentDir, './assets/typography/index.css'),
  ],
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      include: ['types/**/*.d.ts']
    }
  },
});
