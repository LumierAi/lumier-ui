// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'node:path'
import { JasnePreset } from './app/constants/PrimeTheme'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    'nuxt-typed-router',
    '@nuxt/icon',
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
  icon: {
    provider: 'server',
    collections: ['tabler'],
  },
  primevue: {
    autoImport: false,
    components: {
      include: [
        'Textarea',
        'Button',
        'Card',
        'Chip',
        'Skeleton',
        'Toast',
        'Image',
        'ToggleSwitch',
        'InputText',
        'Divider',
        'Menu',
        'ProgressBar',
        'Step',
        'StepList',
        'Panel',
        'StepPanel',
        'StepPanels',
        'Select',
        'Checkbox',
        'ProgressSpinner',
        'AccordionHeader',
        'AccordionContent',
        'AccordionPanel',
        'Accordion',
        'Slider',
        'Dialog',
        'InputNumber',
        'MultiSelect',
        'Dropdown',
        'RadioButton',
        'DataTable',
        'Column',
        'ConfirmDialog',
        'Paginator',
        'Drawer',
        'Message',
      ],
    },
    options: {
      theme: {
        preset: JasnePreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },

  tailwindcss: {
    configPath: 'tailwind.config',
  },
})
