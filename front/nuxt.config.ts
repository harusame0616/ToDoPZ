// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: require('./postcss.config.js'),
  nitro: {
    devProxy: {
      '/api': 'http://todo-service:3000/api',
    },
  },
});
