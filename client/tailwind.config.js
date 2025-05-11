/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lalezar: ["Lalezar", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },

      colors: {
        primary: "#2B293D",
        primaryDark: "#1D1C21",
        secondary: "#FFE047",
        accent: "#E6C72E",
        textPrimary: "#2D2C3C",
        textGray: "#636363",
      },
    },

    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class", // Enable dark mode

  plugins: [],
};
