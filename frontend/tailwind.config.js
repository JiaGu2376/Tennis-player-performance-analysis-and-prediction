/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: '#27481C',
          900: '#4A5D36',
          800: '#57763A',
          700: '#6B894A',
          600: '#7A9959',
          500: '#89A968',
          400: '#98B977',
          300: '#A7C986',
          200: '#B6D995',
          100: '#C5E9A4',
        },
        neutral: {
          200: '#BEBEA6',
          100: '#F2EFDE',
          50: '#F8F6EA',
        },
        background: {
          DEFAULT: '#F3F3F3',
        },
        text: {
          DEFAULT: '#0C0C0C',
        },
      },
      fontFamily: {
        ttcommons: ['TT Commons', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 