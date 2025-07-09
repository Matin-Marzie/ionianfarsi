/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluesea: "#0f8690",
      },

      keyframes: {
        DisplayContinue: {
          '0%': { height: '0px' },
          '95%' : {height: '120px'},
          '100%': { minHeight: '', height: 'content' },
        },
      },

      animation: {
        displayContinue: 'DisplayContinue 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
