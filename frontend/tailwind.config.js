/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluesea: "#0f8690",
        success: "#28a745",
      },

      keyframes: {
        DisplayAnswer: {
          '0%': { height: '0px' },
          '95%' : {height: '120px'},
          '100%': { minHeight: '20dvh', height: 'content' },
        },
      },

      animation: {
        displayAnswer: 'DisplayAnswer 0.2s ease-out forwards',
      },

      screens: {
        'xs': '480px',
      },
      
    },
  },
  plugins: [],
};
