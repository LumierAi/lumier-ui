import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#FFD66E',
        primary600: '#ffb63c',
        transparent: 'transparent',
        white: '#FFFFFF',
        success: '#28b41c',
        secondary: '#312319',
        secondary2: '#312319CC',
        error: '#e7080d',
        danger: '#e7080d',
        surface: '#f9f8f6',
        surface400: '#af9e88',
        surface300: '#c6bcab',
        background: {
          1: '#F9FAFC',
          2: '#F3F1ED',
          3: '#E7E4DC',
          4: '#D1CCBE',
        },
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'Roboto Slab'],
    },
  },
  safelist: [
    '!bg-success',
    '!bg-error',
    'bg-error',
    'bg-danger',
    'bg-success',
    'text-danger',
  ],
}
