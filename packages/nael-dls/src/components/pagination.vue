<script lang="ts" setup>
import { computed } from 'vue';
import NlButton from './button.vue'

type Props = {
  data?: {
    page: number;
    total: number;
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    items: any[]
  }
  limit?: number;
}

const props = withDefaults(defineProps<Props>(), {limit: 20, data: undefined})
const emits = defineEmits(['next', 'previous'])

const startNumber = computed(() => (props.limit *  ((props.data?.page ?? 1) - 1)) + 1)
const endNumber = computed(() => (props.data?.items.length ?? 0) + (props.limit * ((props.data?.page ?? 1)  - 1)))
</script>

<template>
  <nav
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-100"
    aria-label="Pagination"
    col-span="100"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        {{ ' ' }}
        <span class="font-medium">{{ startNumber }}</span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span class="font-medium">{{ endNumber }}</span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ props.data?.total }}</span>
        {{ ' ' }}
        results
      </p>
    </div>
    <div class="flex flex-1 justify-between sm:justify-end gap-2">
      <NlButton
        button-type="box"
        size="sm"
        class="shadow-sm"
        :disabled="!props.data?.hasPreviousPage"
        @click="emits('previous')"
      >
        Previous
      </NlButton>
      <NlButton
        button-type="box"
        size="sm"
        class="shadow-sm"
        :disabled="!props.data?.hasNextPage"
        @click="emits('next')"
      >
        Next
      </NlButton>
    </div>
  </nav>
</template>