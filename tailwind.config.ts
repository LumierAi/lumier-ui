import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#FFD66E',
        transparent: 'transparent',
        white: '#FFFFFF',
        success: '#28b41c',
        error: '#e7080d',
        surface: '#f9f8f6',
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'Roboto Slab'],
    },
  },
}
