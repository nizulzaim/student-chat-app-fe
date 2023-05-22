import { createResolver, useNuxt } from "@nuxt/kit";
import { NaelDlsOptions } from "../types";

/** Register CSS modules */
export const useCSS = (options: NaelDlsOptions) => {
  const { resolve } = createResolver(import.meta.url);
  const nuxt = useNuxt();

  if (options.css) {
    nuxt.options.css.push(resolve("../assets/scss/globals.scss"));
  }

  // Do not register any CSS if `options.css` is `false`
};
