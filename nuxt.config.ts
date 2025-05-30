// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/tailwind.css'],

  modules: ['@nuxtjs/tailwindcss','@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate'],
})