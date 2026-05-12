/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ['Orbitron', 'sans-serif'],
      },
      screens: {
        ls: { raw: '(orientation: landscape) and (max-width: 1023px)' },
      },
    },
  },
  plugins: [],
}