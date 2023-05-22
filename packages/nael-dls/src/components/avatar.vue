<script lang="ts" setup>
type Props = {
  src?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  blankDefault?: boolean,
  circle?: boolean,
}

const props = withDefaults(defineProps<Props>(), { size: 'md', circle: false, blankDefault: false, src: null })

const avatarClass = [
  'dv-avatar',
  props.size,
  { 'circle': props.circle }
]
</script>

<template>
  <span :class="avatarClass">
    <svg
      v-if="!blankDefault"
      class="h-full w-full text-gray-300 absolute top-0 left-0"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      class="h-full w-full text-gray-300 absolute top-0 left-0 bg-gray-200"
      fill="currentColor"
      viewBox="0 0 24 24"
    />
    <img
      v-if="props.src"
      :src="props.src"
      class="absolute top-0 left-0"
    >
  </span>
</template>

<style lang="scss" scoped>
.dv-avatar {
  @apply inline-block h-10 w-10 overflow-hidden rounded-md bg-gray-100 relative;

  &.xs {
    @apply h-5 w-5;
  }

  &.sm {
    @apply h-8 w-8;
  }

  &.lg {
    @apply h-12 w-12;
  }

  &.xl {
    @apply h-14 w-14;
  }

  &.circle {
    @apply rounded-full;
  }
}
</style>