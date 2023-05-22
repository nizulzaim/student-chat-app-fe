<script setup lang="ts">
import { SwitchLabel, SwitchGroup, Switch, SwitchDescription } from '@headlessui/vue'
import { useVModel } from '@vueuse/core';

type Props = {
  modelValue: boolean,
  label: string,
  subtext?: string,
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <SwitchGroup
    as="div"
    class="flex items-center justify-between flex-row-reverse gap-6"
  >
    <span class="flex flex-grow flex-col">
      <SwitchLabel
        as="span"
        class="text-sm font-medium text-gray-700 cursor-pointer"
      >{{ label }}</SwitchLabel>
      <SwitchDescription
        v-if="subtext"
        as="span"
        class="text-sm text-gray-500"
      >{{ props.subtext }}</SwitchDescription>
    </span>
    <Switch
      v-model="data"
      :class="[data ? 'bg-primary-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2']"
    >
      <span
        aria-hidden="true"
        :class="[data ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
      />
    </Switch>
  </SwitchGroup>
</template>