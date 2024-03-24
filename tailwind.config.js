/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'dark-bg-main': 'rgba(52, 58, 70, 0.8)',
        'dark-bg-footer': '#23272f',
      },
    },
  },
  plugins: [],
}