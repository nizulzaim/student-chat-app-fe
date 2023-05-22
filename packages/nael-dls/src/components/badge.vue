<script lang="ts" setup>
import { computed } from 'vue';
import { Colors } from '../types/colors';

type Props = {
  size?: 'md' | 'lg',
  circle?: boolean,
  color?: Colors,
}

const props = withDefaults(defineProps<Props>(), {size: 'md', circle: true, color: 'primary'})

const sizeClassName = {
  xs: "size-xs",
  sm: "size-sm",
  md: "size-md",
  lg: "size-lg",
  xl: "size-xl",
};

const componentClass = computed(() => ([
  'dv-badge',
  sizeClassName[props.size],
  `style-${props.color}`,
  {'type-circle': props.circle}
]))
</script>

<template>
  <span :class="componentClass">
    <svg
      class="mr-1.5 h-2 w-2"
      :class="['dv-badge-svg']"
      fill="currentColor"
      viewBox="0 0 8 8"
    >
      <circle
        cx="4"
        cy="4"
        r="3"
      />
    </svg>
    <slot />
  </span>
</template>

<style lang="scss" scoped>
$colors: "slate", "gray", "zinc", "neutral", "stone", "red", "pink", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "rose", "primary", "accent", 'tertiary', 'quaternary';
.dv-badge {
  @apply inline-flex items-center rounded px-2 py-0.5 text-xs font-medium;

  &.type-circle {
    @apply rounded-full;
  }


  @each $color in $colors {
    &.style-#{$color} {
      @apply bg-#{$color}-100 text-#{$color}-800;

      &.dv-badge-icon {
        @apply text-#{$color}-400;
      }
    }
  }
}
</style>