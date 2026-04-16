/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tezro': {
          gold: '#FFD700',
          darkGold: '#B8860B',
          black: '#000d08',
        }
      },
      dropShadow: {
        'gold': '0 0 10px rgba(255, 215, 0, 0.6)',
        'gold-lg': '0 0 20px rgba(255, 215, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
