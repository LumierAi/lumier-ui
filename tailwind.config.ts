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
        success: '#28b41c',
        error: '#e7080d',
        danger: '#e7080d',
        surface: '#f9f8f6',
        surface400: '#af9e88',
        surface300: '#c6bcab',
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'Roboto Slab'],
    },
  },
}
