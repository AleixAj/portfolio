/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ['"Exo 2"', 'sans-serif'],
      },
      screens: {
        ls: { raw: '(orientation: landscape) and (max-width: 1023px)' },
      },
    },
  },
  plugins: [],
}