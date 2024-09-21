/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(-70%)' },
        },
      },
      animation: {
        slideText: 'slide 15s linear infinite',
      },
    },
  },
  plugins: [],
});
