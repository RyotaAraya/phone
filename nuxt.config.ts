// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  // build: {
  //   postcss: {
  //     postcssOptions: {
  //       plugins: {
  //         tailwindcss: {},
  //         autoprefixer: {},
  //       },
  //     },
  //   },
  // },
  plugins: ["~/plugins/supabase.ts"],
  typescript: {
    strict: true,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
});
