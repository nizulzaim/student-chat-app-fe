import { useCurrentUserQuery } from '~~/graphql'

export const useCurrentUser = () => {
  const { result, error } = useCurrentUserQuery()

  const user = computed(() => {
    if (error.value || !result.value?.currentUser) return undefined;
    const user = result.value?.currentUser
    return user
  })

  return {
    user
  }
}