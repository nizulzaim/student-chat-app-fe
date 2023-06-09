import { createSharedComposable } from '@vueuse/core'
import { useSemestersQuery } from '~~/graphql'

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

  const { result: semestersResult, loading: semestersLoading, refetch: semestersRefecth } = useSemestersQuery({ query: defaultQuery }, { fetchPolicy: 'network-only' })
  const createUpdateState = ref(false)
  const semesters = computed(() => semestersResult.value?.semesters.items ?? [])
  const isCreate = computed(() => !query._id)

  return {
    semesters,
    semestersResult,
    semestersLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    query,
    isCreate,
    semestersRefecth
  }
})