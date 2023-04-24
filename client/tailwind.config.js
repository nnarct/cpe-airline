/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        // calc: "calc(100vh - 3rem)",
      },
    },
    minHeight: {
      calc: "calc(100vh - 3rem)",
    },
  },
  plugins: [],
};
