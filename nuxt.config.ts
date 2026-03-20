// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  pages: true,
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Amiri&family=Scheherazade:wght@700&display=swap'
        }
      ]
    }
  }
})