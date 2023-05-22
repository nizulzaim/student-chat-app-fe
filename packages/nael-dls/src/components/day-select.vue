<script lang="ts" setup>import { ref, watch } from 'vue';
import { DayOfWeek } from '../types/day-of-week';

type Props = {
  modelValue: DayOfWeek[]
}

const props = defineProps<Props>()
const internalValue = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const dayOfWeeks = [
  { name: 'Sunday' },
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
]

watch(() => internalValue.value, (val) => emits('update:modelValue', val))
watch(() => props.modelValue, (val) => internalValue.value = val)
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-medium text-gray-900 mb-1">
        Operational Days
      </h2>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="dayOfWeek in dayOfWeeks"
        :key="dayOfWeek.name"
      >
        <input
          :id="`${dayOfWeek.name}`"
          v-model="internalValue"
          type="checkbox"
          :value="dayOfWeek.name"
          class="sr-only peer"
        >
        <label
          class="p-2 border border-slate-300 rounded-lg text-center cursor-pointer w-full block peer-checked:border-primary-200 peer-checked:bg-primary-200 peer-checked:text-primary-800 hover:bg-primary-100 peer-checked:hover:bg-primary-300 peer-focus:ring-2"
          :for="`${dayOfWeek.name}`"
        >
          {{ dayOfWeek.name.slice(0, 3) }}
        </label>
      </div>
    </div>
  </div>
</template>