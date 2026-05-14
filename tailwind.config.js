/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'bottlefly': '#BFC2C8',
        'night': '#1E1821',
        'crystal': '#AAA2A8',
        'port': '#55303A',
        'twilight': '#95797E',
        'aster': '#D4DBE2',
        'roan': '#875256',
      },
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
        'display': ['Syncopate', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
