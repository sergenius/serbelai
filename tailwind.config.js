/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0047AB', // Cobalt Blue
          dark: '#003380',
          light: '#1E90FF',
        },
        secondary: {
          DEFAULT: '#111111',
          light: '#2D2D2D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};