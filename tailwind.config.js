/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./styles/**/*.css", // Updated pattern
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}