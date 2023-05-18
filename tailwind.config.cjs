const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')

const round = (num) => num.toFixed(7).replace(/(\.[0-9]+?)0+$/, '$1').replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{svelte,js,html}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // '--tw-prose-invert-body': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.gray[700]'),
            // maxWidth: 'none'
          }
        },
        lg: {
          css: {
            // maxWidth: '65ch',
            dt: {
              fontWeight: '600',
              marginTop: em(24, 18),
            }
          }
        },
      })
    },
  },
  plugins: [
    typography(),
    forms({ strategy: 'base' }),
  ],
}
