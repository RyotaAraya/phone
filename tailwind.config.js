/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue", // <= ドキュメントからさらに追加
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
