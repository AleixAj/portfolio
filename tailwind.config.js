/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      // Keep 1920x1080 on the standard desktop layout.
      // Large-content scaling starts only on wider displays.
      '2xl': '2200px',
      '3xl': '2560px',
      ls: { raw: '(orientation: landscape) and (max-width: 1023px)' },
    },
    extend: {
      fontFamily: {
        tech: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}