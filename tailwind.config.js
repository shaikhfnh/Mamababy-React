/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // all your React files
  theme: {
    extend: {
      colors: {
        cream: '#FFF7F2',
        peach: '#FFE5D9',
        pink: '#FFB4A2',
        brown: '#6D4C41',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ["JumanBold", "Poppins", "sans-serif"], 
      },
    },
  },
  plugins: [],
}

