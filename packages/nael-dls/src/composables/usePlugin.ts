import { addPluginTemplate } from "@nuxt/kit";

import { resolveInRuntime } from "../utils/resolve";

import type { NaelDlsOptions } from "../types";

/** Register vuestic nuxt plugin */
export const usePlugin = (options: NaelDlsOptions) => {
  const pluginPath = resolveInRuntime("./runtime/plugin.mjs");

  addPluginTemplate({
    src: pluginPath,
    filename: pluginPath.split("/").pop(),

    // Use JSON.stringify() here, because it will be inserted in ejs template as string. Then we will JSON.parse it.
    options: {
      value: JSON.stringify(options),
    },
  });
};
