<script setup lang="ts">
import { Listbox, ListboxLabel, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/vue'
import NlAvatar from './avatar.vue'
import NlTextfield from './textfield.vue'
import { computed, ref, watch } from 'vue'
import { SelectInput } from '../types/select-input';
import { Float } from '@headlessui-float/vue'

type Props = {
  data: SelectInput[]
  modelValue?: SelectInput
  includeAvatar?: boolean
  label?: string;
  required: boolean,
  noLabel?: boolean,
  disabled?: boolean,
}

const focusEl = ref<InstanceType<typeof NlTextfield>>()
const emits = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), { includeAvatar: false, required: false, noLabel: false, modelValue: undefined, label: undefined, disabled: false })
const internalValue = ref(props.data.find(i => i.value === props.modelValue?.value))
const searchField = ref('')
const filteredData = computed(
  () => props.data.filter(i =>
    i.label.toLowerCase().includes(searchField.value.toLowerCase()) ||
    i.description?.toLowerCase().includes(searchField.value.toLowerCase())
  ))

watch(() => internalValue.value, (val) => emits('update:modelValue', val))
watch(() => props.modelValue, (val) => internalValue.value = props.data.find(i => i.value === val?.value))

watch(() => focusEl.value, (data) => {
  if (data) data.focus()
})
</script>

<template>
  <Listbox
    v-model="internalValue"
    as="div"
    :disabled="props.disabled"
  >
    <Float
      placement="bottom-start"
      class="relative"
      as="div"
      :flip="true"
      strategy="fixed"
      :adaptive-width="true"
    >
      <div class="w-full">
        <div class="flex justify-between mb-1">
          <ListboxLabel
            v-if="props.label"
            class="block text-sm font-medium text-gray-700"
          >
            {{ props.label }}
          </ListboxLabel>
          <span
            v-if="!required && !noLabel"
            class="text-sm text-gray-400 dark:text-gray-300"
          >Optional</span>
        </div>
        <ListboxButton
          :disabled="disabled"
          class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm disabled:bg-slate-100"
        >
          <span class="flex items-center">
            <NlAvatar
              :src="internalValue?.avatar"
              circle
              size="xs"
            />
            <span class="ml-3 block truncate">{{ internalValue?.label ?? 'No Data Selected' }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <Icon
              name="carbon:chevron-sort"
              class="h-5 w-5 text-gray-400"
            />
          </span>
          <input
            v-model="internalValue"
            class="sr-only"
            :required="props.required"
          >
        </ListboxButton>
      </div>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-hidden"
        >
          <div class="m-3">
            <NlTextfield
              ref="focusEl"
              v-model="searchField"
              no-label
              placeholder="Search"
            />
          </div>
          <div class="overflow-auto max-h-56">
            <ListboxOption
              v-for="item in filteredData"
              :key="item.value"
              v-slot="{ active, selected, disabled: stateDisabled }"
              as="template"
              :value="item"
              class="rounded-md"
              :disabled="item.disabled"
            >
              <li
                :class="[active ? !stateDisabled ?'text-white bg-primary-600' : 'text-white bg-gray-400' : !stateDisabled ? 'text-gray-900': 'text-gray-500', 'relative select-none py-2 pl-3 pr-9 cursor-pointer group']"
              >
                <div class="flex items-center">
                  <NlAvatar
                    :src="item.avatar"
                    circle
                    size="sm"
                  />
                  <div>
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-4 block truncate']">
                      {{
                        item.label
                      }}
                    </span>
                    <span
                      :class="[active ? 'font-medium text-white' : !stateDisabled ? 'font-normal text-slate-500': 'font-normal text-slate-400', 'ml-4 block truncate']"
                    >{{
                      item.description
                    }}</span>
                  </div>
                </div>

                <span
                  v-if="selected"
                  :class="[active ? 'text-white' : 'text-primary-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"
                >
                  <Icon
                    name="ic:baseline-check"
                    class="h-5 w-5"
                  />
                </span>
              </li>
            </ListboxOption>
          </div>
        </ListboxOptions>
      </transition>
    </Float>
  </Listbox>
</template>