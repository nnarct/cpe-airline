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
      width: {
        22: "5.5rem",
        38: "9.5rem",
        100: "25rem",
        110: "27.5rem",
        120: "30rem",
      },
      minWidth: {
        20: "5rem",
        22: "5.5rem",
        24: "6rem",
        26: "6.5rem",
        28: "7rem",
        30: "7.5rem",
        32: "8rem",
        34: "8.5rem",
        36: "9rem",
        38: "9.5rem",
      },
      maxWidth: {
        "screen-sidebar": "calc(100vw - 13rem)",
        1000: "1000px",
      },
      colors: {
        primary: "#0D3E5E",
        lightblue: "#E9EDEF",
      },
      gridTemplateColumns: {
        '13' : 'repeat(13, minmax(0, 1fr))',
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
