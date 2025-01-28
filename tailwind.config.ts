import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  safelist: ['bg-success', 'bg-danger'],
  theme: {
    extend: {
      colors: {
        primary: '#FFD66E',
        primary600: '#ffb63c',
        transparent: 'transparent',
        white: '#FFFFFF',
        success: '#28841C',
        error: '#F20000',
        info: '#3275FC',
        danger: '#e7080d',
        surface: '#f9f8f6',
        surface400: '#af9e88',
        surface300: '#c6bcab',
        background: {
          1: '#F9FAFC',
          2: '#F3F1ED',
          3: '#E7EADC',
          4: '#D1CCBE',
        },
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'Roboto Slab'],
    },
  },
}
