// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nael/dls", "@nuxtjs/apollo", 'nuxt-headlessui'],
  naelDls: {
    colors: {
      primary: {
        DEFAULT: "#fbd000",
        '50': '#ffffe7',
        '100': '#ffffc1',
        '200': '#fffc86',
        '300': '#fff241',
        '400': '#ffe20d',
        '500': '#fbd000',
        '600': '#d19b00',
        '700': '#a66f02',
        '800': '#89560a',
        '900': '#74460f',
      },
      accent: {
        DEFAULT: '#ff2738',
        '50': '#fff0f1',
        '100': '#ffdde0',
        '200': '#ffc1c6',
        '300': '#ff969e',
        '400': '#ff5a67',
        '500': '#ff2738',
        '600': '#fa081b',
        '700': '#d30212',
        '800': '#ae0613',
        '900': '#720a12',
      }
    }
  },
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
