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

        Wave: {
          "0%": { backgroundPositionX: "0px" },
          "100%": { backgroundPositionX: "200px" },
        },
      },

      animation: {
        displayAnswer: 'DisplayAnswer 0.2s ease-out forwards',
        wave: "Wave 4s linear infinite",
      },

      screens: {
        'xs': '480px',
      },
      
    },
  },
  plugins: [],
};
