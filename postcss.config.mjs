/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urdu: ["var(--font-nastaliq)", "serif"],
      },
    },
  },
  plugins: ["@tailwindcss/postcss"], 
};

export default config;
