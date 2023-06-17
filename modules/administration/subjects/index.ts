import { createSharedComposable } from '@vueuse/core'
import { useSubjectQuery, useSubjectsQuery } from '~~/graphql'

export const useSharedVariable = createSharedComposable(() => {
  const defaultQuery = reactive({
    limit: 20,
    search: '',
    page: 1,
  })

  const updateSearch = (search: string) => {
    defaultQuery.search = search
  }

  const { result: subjectsResult, loading: subjectsLoading, refetch: subjectsRefetch } = useSubjectsQuery({ query: defaultQuery }, { fetchPolicy: 'network-only' })
  const createUpdateState = ref(false)
  const addAttachmentState = ref(false)
  const subjects = computed(() => subjectsResult.value?.subjects.items ?? [])

  return {
    subjects,
    subjectsResult,
    subjectsLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    subjectsRefetch,
    addAttachmentState,
  }
})