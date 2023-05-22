import { createSharedComposable } from '@vueuse/core'
import { useUsersQuery } from '~~/graphql'

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

  const { result: usersResult, loading: usersLoading, refetch: usersRefetch } = useUsersQuery({ query: defaultQuery.value })
  const createUpdateState = ref(false)
  const users = computed(() => usersResult.value?.users.items ?? [])
  const isCreate = computed(() => !selectedId.value)

  console.log(isCreate.value)

  return {
    users,
    usersResult,
    usersLoading,
    createUpdateState,
    updateSearch,
    defaultQuery,
    selectedId,
    isCreate,
    usersRefetch
  }
})