/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aero-blue': '#4fc3f7',
        'aero-cyan': '#00bcd4',
        'aero-green': '#aed581',
      },
      backgroundImage: {
        'aero-gradient': 'linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #4dd0e1 100%)',
      }
    },
  },
  plugins: [],
}