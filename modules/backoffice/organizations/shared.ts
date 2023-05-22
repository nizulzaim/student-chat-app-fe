import { createSharedComposable } from '@vueuse/core'
import { useOrganizationsQuery } from '~~/graphql'

export const useSharedVariable = createSharedComposable(() => {
  const defaultQuery = ref({
    limit: 20,
    search: '',
    page: 1,
  })

  const selectedId = ref<string>()

  const updateSearch = (search: string) => {
    defaultQuery.value.search = search
  }

  const { result: organizationsResult, loading: organizationsLoading, refetch: organizationsRefetch } = useOrganizationsQuery({ query: defaultQuery.value })
  const createUpdateState = ref(false)
  const organizations = computed(() => organizationsResult.value?.organizations.items ?? [])
  const isCreate = computed(() => !selectedId.value)

  return {
    organizations,
    organizationsResult,
    organizationsLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    selectedId,
    isCreate,
    organizationsRefetch
  }
})