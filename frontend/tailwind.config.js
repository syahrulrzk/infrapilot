/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0f172a',
        'light-blue': '#f1f5f9',
        'neon-cyan': '#00f7ff',
        'neon-green': '#39ff14',
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}