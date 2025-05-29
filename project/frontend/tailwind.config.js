/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'youtube-red': '#FF0000',
        'youtube-red-dark': '#CC0000',
        'youtube-red-light': '#FF3333',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      aspectRatio: {
        'video': '16 / 9',
      },
      backdropBlur: {
        'xs': '2px',
      },
      gridTemplateColumns: {
        'auto-fill-240': 'repeat(auto-fill, minmax(240px, 1fr))',
        'auto-fill-280': 'repeat(auto-fill, minmax(280px, 1fr))',
        'auto-fill-320': 'repeat(auto-fill, minmax(320px, 1fr))',
      },
    },
  },
  plugins: [],
};