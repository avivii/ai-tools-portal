/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'Rubik', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        academic: {
          50: '#f4f8fc',
          100: '#e8f1f9',
          200: '#c8ddf2',
          300: '#9ec1e8',
          400: '#6ea0db',
          500: '#4880cd',
          600: '#2d63b4',
          700: '#234f93',
          800: '#1d4177',
          900: '#1a3762',
          950: '#10223d',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-hover': '0 10px 25px -5px rgba(29, 65, 119, 0.1), 0 8px 10px -6px rgba(29, 65, 119, 0.06)',
      }
    },
  },
  plugins: [],
}
