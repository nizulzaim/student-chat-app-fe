import { defineNuxtModule, installModule } from "@nuxt/kit";
import { useComponents } from "./composables/useComponents";
import { useTranspile } from "./composables/useTranspile";
import { useCSS } from "./composables/useCss";
import { usePlugin } from "./composables/usePlugin";
import { NaelDlsOptions } from "./types";
import { fontFamily } from 'tailwindcss/defaultTheme'
import { useComposables } from "./composables/useComposables";
// Module options TypeScript inteface definition
export default defineNuxtModule<NaelDlsOptions>({
  meta: {
    name: "@nael/dls",
    configKey: "naelDls",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    css: true,
  },
  setup(options, nuxt) {
    const defaultColors: NaelDlsOptions['colors'] = {
      primary: {
        DEFAULT: "#415aff",
        50: "#eaf2ff",
        100: "#d9e7ff",
        200: "#bad1ff",
        300: "#90b1ff",
        400: "#6585ff",
        500: "#415aff",
        600: "#202aff",
        700: "#151bed",
        800: "#151cbe",
        900: "#10155b",
      },
      accent: {
        DEFAULT: "#ff2dbf",
        50: "#fff0fb",
        100: "#ffe4f8",
        200: "#ffc8f3",
        300: "#ff9be7",
        400: "#ff5cd5",
        500: "#ff2dbf",
        600: "#ef0698",
        700: "#da0080",
        800: "#b30169",
        900: "#95065a",
      },
      tertiary: {
        DEFAULT: "#ff910a",
        50: "#fffaec",
        100: "#fff3d3",
        200: "#ffe3a5",
        300: "#ffcd6d",
        400: "#ffac32",
        500: "#ff910a",
        600: "#ff7900",
        700: "#cc5802",
        800: "#a1440b",
        900: "#823a0c",
      },
      quaternary: {
        DEFAULT: "#01b9e9",
        50: "#effbff",
        100: "#def5ff",
        200: "#b6efff",
        300: "#75e4ff",
        400: "#2dd7ff",
        500: "#01b9e9",
        600: "#009ed3",
        700: "#007eaa",
        800: "#006a8c",
        900: "#065774",
      }
    }

    installModule("nuxt-icon", {}, nuxt);
    console.log(options.colors)
    installModule(
      "@nuxtjs/tailwindcss",
      {
        config: {
          content: ["./**/*.vue", "pages/**/*.vue"],
          darkMode: "class",
          theme: {
            extend: {
              maxWidth: {
                "8xl": "88rem",
              },
              fontFamily: {
                sans: ["Inter", ...fontFamily.sans],
                lexend: ["Lexend", ...fontFamily.sans],
              },
              colors: { ...defaultColors, ...options.colors }
            },
          },
          plugins: [require("@tailwindcss/forms")]
        },
      },
      nuxt
    );
    useCSS(options);
    usePlugin(options);
    useComponents();
    useComposables()
    useTranspile();
  },
});
