import { createSharedComposable } from '@vueuse/core'
import { useSubjectsQuery } from '~~/graphql'

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

  const { result: subjectsResult, loading: subjectsLoading, refetch: subjectsRefecth } = useSubjectsQuery({ query: defaultQuery }, { fetchPolicy: 'network-only' })
  const createUpdateState = ref(false)
  const subjects = computed(() => subjectsResult.value?.subjects.items ?? [])
  const isCreate = computed(() => !query._id)

  return {
    subjects,
    subjectsResult,
    subjectsLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    query,
    isCreate,
    subjectsRefecth
  }
})