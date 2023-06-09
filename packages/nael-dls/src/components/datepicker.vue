<script lang="ts" setup>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { endOfDay, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subYears } from 'date-fns'
import format from 'date-fns/format'
import type { RangeDate } from '~/types/range-date'
import { computed, ref } from 'vue'

type Props = {
  modelValue: Date | RangeDate | null
  label: string
  enablePresets?: boolean
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  textInput?: boolean
  inline?: boolean
  format?: string
  required?: boolean
  noLabel?: boolean
}
const props = withDefaults(defineProps<Props>(), { disabled: false, required: false, noLabel: false, inline: false, format: "dd/MMM/yyyy" })
const emit = defineEmits(['update:modelValue'])

const internalDate = ref(props.modelValue)
const isMulti = Array.isArray(props.modelValue)

const lastYear = subYears(new Date(), 1)

const presetRanges = computed(() => {
  return isMulti && props.enablePresets
    ? [
        { label: 'Today', range: [new Date(), new Date()] },
        { label: 'Yesterday', range: [subDays(new Date(), 1), subDays(new Date(), 1)] },
        { label: 'This Week', range: [startOfWeek(new Date(), { weekStartsOn: 1 }), endOfWeek(new Date(), { weekStartsOn: 1 })] },
        { label: 'This month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
        {
          label: 'Last month',
          range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
        },
        { label: 'This year', range: [startOfYear(new Date()), endOfYear(new Date())] },
        { label: 'Last year', range: [startOfYear(lastYear), endOfYear(lastYear)] },
      ]
    : []
})

const dateString = computed(() => {
  if (isMulti && props.modelValue.length === 2)
    return `${format((props.modelValue as Date[])[0], 'dd MMM yyyy')} - ${format((props.modelValue as Date[])[1], 'dd MMM yyyy')}`
  else if (!isMulti && props.modelValue)
    return format(props.modelValue as Date, 'dd MMM yyyy')

  return null
})

const confirm = (close: any) => {
  emit('update:modelValue', isMulti
    ? [startOfDay((internalDate.value as RangeDate)[0]), endOfDay((internalDate.value as RangeDate)[1])]
    : internalDate.value,
  )
  close()
}
</script>

<template>
  <div>
    <PopoverGroup>
      <Popover
        v-slot="{ close }"
        as="div"
        class="relative text-left"
      >
        <Float
          strategy="fixed"
          placement="bottom-start"
          :flip="true"
        >
          <div>
            <div
              v-if="!noLabel"
              class="flex justify-between mb-1"
            >
              <label
                v-if="props.label"
                class="block text-sm font-medium text-gray-700 dark:text-slate-100"
              >
                {{
                  props.label
                }}
              </label>
              <span
                v-if="!required && !noLabel"
                class="text-sm text-gray-400 dark:text-gray-300"
              >Optional</span>
            </div>
            <PopoverButton
              class="bg-white dark:bg-slate-700 relative w-full border border-gray-300 dark:border-slate-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:ring-primary-300 dark:focus:border-primary-300 sm:text-sm disabled:border-gray-300 disabled:border disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <div class="flex items-center">
                <div class="block truncate dark:text-gray-300">
                  {{ dateString ?? 'Select Date' }}
                </div>
              </div>
              <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon
                  name="ic:twotone-date-range"
                  class="cursor-pointer text-gray-600 w-6 h-6"
                />
              </span>
            </PopoverButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <PopoverPanel
              class="listbox z-10 mt-2 rounded-md bg-white dark:bg-slate-800 p-4 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none ring-no-inset"
            >
              <Datepicker
                v-model="internalDate"
                :inline="true"
                auto-apply
                :enable-time-picker="false"
                :range="isMulti"
                :multi-calendars="isMulti"
                :month-change-on-scroll="false"
                :preset-ranges="presetRanges"
                :min-date="minDate"
                :max-date="maxDate"
                :min-date-range="minDate"
                :max-date-range="maxDate"
                :text-input="textInput"
                :format="props.format"
                :disabled="disabled"
                @update:model-value="confirm(close)"
              />
            </PopoverPanel>
          </transition>
        </Float>
      </Popover>
    </PopoverGroup>
  </div>
</template>

<style lang="scss">
.dp__theme_light {
  --dp-primary-color: #720a12;
  --dp-border-color-hover:  #720a12;
}

.dp__theme_dark {
  --dp-primary-color: #720a12;
  --dp-background-color: #1e293b;
  --dp-text-color: #f3f4f6;
  --dp-border-color-hover: #720a12;
}

.dp__menu {
  border: 0 !important;
}

.dp__cell_inner,
.dp__calendar_header_item {
  width: 36px;
  height: 36px;
  padding: 8px;
  @apply font-sans;
}

.dp__cell_inner {
  @apply font-normal;
}

.dp__calendar_header_item {
  @apply font-semibold;
}

.dp__preset_range {
  @apply text-sm -ml-5 pl-6 pr-6 text-gray-500;
}
</style>
