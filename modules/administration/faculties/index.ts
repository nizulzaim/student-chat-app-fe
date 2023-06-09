import { createSharedComposable } from '@vueuse/core'
import { useFacultiesQuery } from '~~/graphql'

export const useSharedVariable = createSharedComposable(() => {
  const defaultQuery = reactive({
    limit: 20,
    search: '',
    page: 1,
  })

  const query = reactive<{ _id: string }>({ _id: '' })

  const updateSearch = (search: string) => {
    defaultQuery.search = search
  }

  const { result: facultiesResult, loading: facultiesLoading, refetch: facultiesRefecth } = useFacultiesQuery({ query: defaultQuery }, { fetchPolicy: 'network-only' })
  const createUpdateState = ref(false)
  const faculties = computed(() => facultiesResult.value?.faculties.items ?? [])
  const isCreate = computed(() => !query._id)

  return {
    faculties,
    facultiesResult,
    facultiesLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    query,
    isCreate,
    facultiesRefecth
  }
})