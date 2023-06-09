<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
type Props  = {
  modelValue: boolean,
  title: string,
  subtitle?: string,
}

const props = withDefaults(defineProps<Props>(), { subtitle: undefined })
const emits = defineEmits(['update:modelValue', 'modalClose'])
const close = () => {
  emits('update:modelValue', false)
  emits('modalClose')
}
</script>

<template>
  <TransitionRoot
    as="template"
    :show="props.modelValue"
  >
    <Dialog
      as="div"
      class="relative z-50"
      @close="close"
    >
      <div class="fixed inset crystalline opacity-95" />
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 lg:p-6 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-lg lg:rounded-xl overflow-hidden lg:shadow-xl">
                <div class="flex h-full flex-col bg-white shadow-xl">
                  <div class="bg-primary-700 py-4 lg:py-8 px-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <DialogTitle class="text-lg font-medium text-white">
                        {{ props.title }}
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                          @click="close"
                        >
                          <span class="sr-only">Close panel</span>
                          <Icon
                            name="mdi:close-circle"
                            class="h-6 w-6"
                          />
                        </button>
                      </div>
                    </div>
                    <div
                      v-if="props.subtitle"
                      class="mt-1"
                    >
                      <p class="text-sm text-primary-300">
                        {{ props.subtitle }}
                      </p>
                    </div>
                  </div>
                  <div class="relative flex-1 py-6 px-4 sm:px-6 overflow-y-auto">
                    <!-- Replace with your content -->
                    <slot />
                    <!-- /End replace -->
                  </div>
                  <div
                    v-if="$slots.footer"
                    class="flex flex-shrink-0 justify-end px-4 py-4 border-t"
                  >
                    <slot name="footer" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>
.crystalline {
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #423c5a80;   
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
}
</style>