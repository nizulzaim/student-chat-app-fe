import type { CodegenConfig } from '@graphql-codegen/cli'


const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:7070/graphql',
  documents: ['./graphql/**/*.gql'],
  verbose: true,
  generates: {
    './graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
      config: {
        vueCompositionApiImportFrom: 'vue',
        withCompositionFunctions: true,
        addDocBlocks: true,
      },
    },
  },
}

export default config
