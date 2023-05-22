<script lang="ts" setup>
import type { ValidateError } from 'async-validator'
import { useSlots, ref, computed, watch } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'
import { useMotions } from '@vueuse/motion'
import { useFocus, watchDebounced } from '@vueuse/core'
import { useHelper } from '../composables/useHelper'

const { makeId } = useHelper()

type Props = {
  modelValue: string | number | undefined
  type?: 'text' | 'number' | 'password' | 'email' | 'currency'
  name?: string
  placeholder?: string
  label?: string
  helpText?: string
  helpTextCls?: string
  validate?: ValidateError[]
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  noLabel?: boolean
  useFocus?: boolean
  min?: number
  max?: number
  currencyOptions?: any
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  name: '',
  placeholder: '',
  helpTextCls: 'text-gray-500 dark:text-gray-400',
  required: false,
  disabled: false,
  label: undefined,
  helpText: undefined,
  validate: undefined,
  min: undefined,
  max: undefined,
  readonly: false,
  noLabel: false,
  useFocus: false,
  currencyOptions: {
    currency: 'MYR',
    hideCurrencySymbolOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
  },
})

const emit = defineEmits(['update:modelValue', 'updateSearch'])

const formId = makeId(10)

const slot = useSlots()
const inputEl = ref<HTMLInputElement>()

const classComputed = computed(() => {
  return [
    {
      textfield: true,
      'textfield-leading-icon': slot.leadingIcon,
      'textfield-trailing-icon': slot.trailingIcon,
    },
  ]
})

const internalValue = ref(props.modelValue)
const currencyValue = ref(props.modelValue)

const { inputRef, numberValue, setValue } = useCurrencyInput({
  ...props.currencyOptions,
  valueScaling: 'precision',
  precision: 2,
})

if (props.useFocus) useFocus(props.type === 'currency' ? inputRef : inputEl, { initialValue: true })

watch(
  () => internalValue.value,
  (val) => {
    emit('update:modelValue', val)
  },
)

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val

    if (props.type === 'currency') setValue(typeof val === 'number' ? val : null)
  },
)

watchDebounced(
  () => internalValue.value,
  (val) => {
    emit('updateSearch', val)
  },
  { debounce: 500 },
)

watch(
  () => numberValue.value,
  (val) => {
    emit('update:modelValue', val)
  },
)

const focus = () => {
  setTimeout(() => {
    inputEl.value?.focus()
  }, 100)
}

const motions = useMotions()

defineExpose({ focus, inputEl })
</script>

<template>
  <div>
    <div
      v-if="!noLabel"
      class="flex justify-between mb-1"
    >
      <label
        v-if="props.label"
        :for="formId"
        class="block text-sm font-medium text-gray-700 dark:text-slate-100"
      >{{ props.label }}</label>
      <span
        v-if="!required && !noLabel"
        class="text-sm text-gray-400 dark:text-gray-300"
      >Optional</span>
      <div
        v-if="validate && validate.length > 0"
        class="float-right"
      >
        <Icon
          name="fa6-solid:circle-exclamation"
          class="text-red"
        />
      </div>
    </div>
    <div class="relative rounded-md shadow-sm">
      <div
        v-if="slot.leadingIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="leadingIcon" />
      </div>

      <input
        v-if="props.type !== 'currency'"
        :id="formId"
        ref="inputEl"
        v-model="internalValue"
        :type="props.type"
        :name="props.name"
        :class="classComputed"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        auto-complete="new-password"
        :required="props.required"
        :min="props.min"
        :max="props.max"
      >

      <input
        v-else
        :id="formId"
        ref="inputRef"
        v-model="currencyValue"
        :name="props.name"
        type="text"
        :class="classComputed"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        autoComplete="new-password"
        :required="props.required"
        :min="props.min"
        :max="props.max"
      >

      <div
        v-if="slot.trailingIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="trailingIcon" />
      </div>
    </div>
    <transition
      :css="false"
      @leave="(el: Element, done: () => void) => motions[formId].leave(done)"
    >
      <div
        v-if="props.helpText"
        class="mt-1 ml-1 text-sm"
        :class="props.helpTextCls"
        v-html="props.helpText"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.textfield {
  @apply focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md read-only:border-0 disabled:bg-gray-100 read-only:focus:ring-transparent read-only:focus:border-0 disabled:border-gray-300 disabled:border dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-primary-200 dark:text-slate-50 dark:focus:bg-slate-500 dark:placeholder:text-slate-100;
}

.textfield-leading-icon {
  @apply pl-10;
}

.textfield-trailing-icon {
  @apply pr-10;
}

.avatar-rounded-full {
  @apply rounded-full;
}
</style>
