// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  auth: {
    strategies: {
      github: {
        clientId: process.env.SUPABASE_GITHUB_CLIENT_ID,
        clientSecret: process.env.SUPABASE_GITHUB_CLIENT_SECRET,
        redirect_uri:
          "https://qhdghrxwudtdewgvqzbj.supabase.co/auth/v1/callback",
      },
    },
  },
  plugins: ["~/plugins/supabase.ts"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    //  "@nuxtjs/supabase"
  ],
});
