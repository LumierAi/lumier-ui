// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'modules/design'
  ],
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
