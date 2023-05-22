// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nael/dls", "@nuxtjs/apollo", 'nuxt-headlessui'],
  naelDls: {},
  runtimeConfig: {
    public: {
      API_URI: process.env.API_URI
    }
  },
  headlessui: {
    prefix: 'Hd'
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.API_URI as string,
      }
    },
  },
});
