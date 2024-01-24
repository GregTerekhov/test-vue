/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#2da3d3',
        accentMedium: '#61c0d9',
        accentLight: '#dff8ff',
        selectedSeats: '#f2a729',
        backgroundBase: '#f4f4f4',
        textPrimary: '#181818',
        callToAction: '#fd4037' // змінено на акцентний колір
      }
    }
  },
  plugins: []
}
