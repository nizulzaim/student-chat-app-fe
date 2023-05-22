// import { useGlobalQueryLoading } from '@vue/apollo-composable'
import { refThrottled } from '@vueuse/core'

export const useComponentQueryLoading = () => {
  const loadingMutationComp = useGlobalQueryLoading()
  const loading = ref(false)

  watch(() => loadingMutationComp.value, (val) => {
    if (!val) {
      setTimeout(() => {
        loading.value = val
      }, 2000);
    } else {
      loading.value = val
    }
  })
  return loading
}

export const useComponentMutationLoading = () => {
  const loadingMutationComp = useGlobalMutationLoading()
  const loading = ref(false)

  watch(() => loadingMutationComp.value, (val) => {
    if (!val) {
      setTimeout(() => {
        loading.value = val
      }, 2000);
    } else {
      loading.value = val
    }
  })
  return loading
}