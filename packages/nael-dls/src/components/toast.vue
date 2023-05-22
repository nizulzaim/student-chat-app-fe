<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue';
type Props = {
  type?: 'simple' | 'success' | 'error' | 'info' | 'warn'
  message?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), { type: 'simple', message: '', subtitle: '' })

const show = ref(true)

const close = () => {
  show.value = false
}
defineExpose({ close })
</script>

<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="max-w-sm w-full bg-slate-800 dark:bg-white shadow-lg rounded-lg pointer-events-auto"
    >
      <div class="p-4">
        <!---------------------------
          By Default it will be simple
          but below conditions for
          success | error | info | warn
          ------------------------------>
        <div
          v-if="props.type === 'success' || 'error' || 'info' || 'warn'"
          class="flex items-start"
        >
          <div class="flex-shrink-0">
            <Icon
              v-if="props.type === 'success'"
              icon="ic:round-check-circle"
              class="h-6 w-6 text-green-400"
            />
            <Icon
              v-if="props.type === 'error'"
              icon="mdi:close-circle"
              class="h-6 w-6 text-red-400"
            />
            <Icon
              v-if="props.type === 'info'"
              icon="mdi:information"
              class="h-6 w-6 text-accent-400"
              aria-hidden="true"
            />
            <Icon
              v-if="props.type === 'warn'"
              icon="mdi:alert-circle"
              class="h-6 w-6 text-amber-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium dark:text-gray-900 text-white">
              {{ props.message }}
            </p>
            <p
              v-if="props.subtitle !== ''"
              class="mt-1 text-sm dark:text-gray-500 text-gray-300"
            >
              {{ props.subtitle }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              class="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="show = false"
            >
              <span class="sr-only">Close</span>
              <Icon
                icon="mdi:close"
                class="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
