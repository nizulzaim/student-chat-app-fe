import { addComponentsDir, createResolver } from "@nuxt/kit";

/** Register vuestic composables globally with auto-import */
export const useComponents = () => {
  const { resolve } = createResolver(import.meta.url);
  addComponentsDir({
    path: resolve("../components"),
    prefix: 'nl',
  });
};
