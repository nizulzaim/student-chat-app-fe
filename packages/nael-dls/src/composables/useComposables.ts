import { resolveInRuntime } from './../utils/resolve';
import type { Import } from 'unimport'

import { addImports } from '@nuxt/kit'
import importNames from '../config/composables'

/** Register vuestic composables globally with auto-import */
export const useComposables = () => {
  const composablesFrom = resolveInRuntime('./runtime/composables.mjs')
  const autoImportsList = importNames
    .map<Import>((item) => ({
      name: item,
      as: item,
      from: composablesFrom,
    }))

  addImports(autoImportsList)
}
