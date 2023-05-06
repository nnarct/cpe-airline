/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      height: {
        // calc: "calc(100vh - 3rem)",
      },
      minHeight: {
        calc: "calc(100vh - 3rem)",
      },
      maxHeight: {
        calc: "calc(100vh - 3rem)",
      },
      colors: {
        primary: "#0D3E5E",
        lightblue: "#E9EDEF",
      },
      screens: {
        xs: "475px",
        // => @media (min-width: 475px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        l: "990px",
        // => @media (min-width: 990px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
