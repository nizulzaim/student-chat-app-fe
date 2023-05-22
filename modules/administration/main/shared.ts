import { createSharedComposable } from '@vueuse/core'
import { useCurrentOrganizationQuery } from '~~/graphql'

export const useSharedVariable = createSharedComposable(() => {
  const { result: currentOrganizationResult, refetch: currentOrganizationRefetch } = useCurrentOrganizationQuery()
  const currentOrganization = computed(() => currentOrganizationResult.value?.currentOrganization)

  type InputType = {
    name: string,
  }

  const input = reactive<InputType>({
    name: '',
  })

  watch(() => currentOrganization.value, (data) => {
    if (data) {
      input.name = data.name
    }
  })

  return {
    currentOrganization,
    currentOrganizationRefetch,
    input
  }
})