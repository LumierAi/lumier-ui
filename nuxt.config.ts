// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'node:path'
import { JasnePreset } from './app/constants/PrimeTheme'
import { LocaleDictionary } from './i18n/locales'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/mdc',
  ],
  $meta: {
    name: 'lumier-ui',
  },
  ssr: false,
  imports: {
    dirs: ['composables', 'utils', 'types/**'],
  },
  devtools: { enabled: true },

  css: [
    join(__dirname, './app/assets/fonts/font-face.css'),
    join(__dirname, './app/assets/typography/index.css'),
    join(__dirname, './app/assets/core/index.css'),
  ],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-12-22',
  vite: {
    css: {
      preprocessorMaxWorkers: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
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

  colorMode: {
    preference: 'light',
  },

  i18n: {
    locales: LocaleDictionary,
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_cookie',
    },
    vueI18n: './i18n.config.ts',
  },
  icon: {
    provider: 'server',
    collections: ['tabler'],
    customCollections: [
      {
        prefix: 'jasne',
        dir: './app/assets/jasne-icons',
      },
    ],
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
        'Form',
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
        'ToggleSwitch',
        'Slider',
        'Dialog',
        'InputNumber',
        'MultiSelect',
        'Dropdown',
        'RadioButton',
        'AccordionTab',
        'DataTable',
        'Column',
        'Popover',
        'SelectButton',
        'ToggleButton',
        'ConfirmDialog',
        'Paginator',
        'Drawer',
        'Message',
        'Avatar',
        'MenuItem',
        'Menubar',
        'Tabs',
        'Tab',
        'TabPanel',
        'FloatLabel',
        'TabPanels',
        'TabList',
        'Calendar',
        'InputOtp',
      ],
    },
    options: {
      theme: {
        preset: JasnePreset,
        options: {
          darkModeSelector: '.fake-dark-mode',
        },
      },
    },
  },
  tailwindcss: {
    configPath: 'tailwind.config',

  },
})
