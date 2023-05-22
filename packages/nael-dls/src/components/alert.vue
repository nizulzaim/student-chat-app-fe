<script lang="ts" setup>
import { Colors } from '../types/colors';
type Props = {
  type?: Colors,
  text: string;
  showClose?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  showClose: false
})

const emit = defineEmits(['close'])

const buttonClass = [
  'dv-alert',
  `style-${props.type}`,
]

const close = () => emit('close')
</script>

<template>
  <div :class="buttonClass">
    <div class="flex">
      <div class="dv-alert-icon">
        <slot name="icon" />
      </div>
      <div class="ml-3">
        <div
          class="flex-1 md:flex md:justify-between dv-alert-text"
          v-html="text"
        />
        <div
          v-if="$slots.default"
          class="dv-alert-details"
        >
          <slot />
        </div>
      </div>
      <div
        v-if="props.showClose"
        class="ml-auto pl-3"
      >
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 dv-alert-icon focus:outline-none"
            @click="close"
          >
            <span class="sr-only">Dismiss</span>
            <Icon name="ph:x-duotone" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$colors: "slate", "gray", "zinc", "neutral", "stone", "red", "pink", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "rose", "primary", "accent", 'tertiary', 'quaternary';

.dv-alert {
  @apply rounded-md bg-primary-400 p-4 w-full dark:bg-primary-600;

  .dv-alert-text {
    @apply text-sm font-medium text-primary-900 dark:text-primary-50;
  }

  .dv-alert-details {
    @apply mt-2 text-sm text-primary-800 dark:text-primary-100;
  }

  .dv-alert-icon {
    @apply flex-shrink-0 text-primary-800 text-xl dark:text-primary-300;
    line-height: 1;
  }

   @each $color in $colors {
    &.style-#{$color} {
      @apply bg-#{$color}-400 dark:bg-#{$color}-600;
 
      .dv-alert-text {
        @apply text-#{$color}-900 dark:text-#{$color}-50;
      }
  
      .dv-alert-details {
        @apply text-#{$color}-800 dark:text-#{$color}-100;
      }
  
      .dv-alert-icon {
        @apply text-#{$color}-800 dark:text-#{$color}-300;
      }
    }
  }
}
</style>