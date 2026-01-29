/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      colors: {
        lavender: {
          50: '#faf7fc',
          100: '#f3edf8',
          200: '#e9dcf2',
          300: '#d9bfe8',
          400: '#c299da',
          500: '#a86cc8',
          600: '#8f4ead',
          700: '#773d8f',
          800: '#633775',
          900: '#522e5f',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e3ebe3',
          200: '#c7d8c8',
          300: '#a2bda4',
          400: '#7a9d7d',
          500: '#5b8260',
          600: '#46674c',
          700: '#39533e',
          800: '#2f4333',
          900: '#28382b',
        }
      },
    },
  },
  plugins: [],
}
