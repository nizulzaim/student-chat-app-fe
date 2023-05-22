<script lang="ts" setup>
type Props = {
  disabled?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  light?: boolean;
  buttonType?: 'primary' | 'accent' | 'tertiary' | 'quaternary' | 'transparent' | 'transparent-primary' | 'transparent-accent' | 'bg-invert' | 'bg-theme' | 'box' | 'gradient-1' | 'gradient-2' | 'gradient-3' | 'gradient-4',
  rounded?: boolean;
  type?: 'submit' | 'reset' | 'button';
};

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  light: false,
  buttonType: 'primary',
  disabled: false,
  rounded: false,
  type: 'button'
})

const sizeClassName = {
  xs: "size-xs",
  sm: "size-sm",
  md: "size-md",
  lg: "size-lg",
  xl: "size-xl",
};


const buttonClass = [
  'dv-button',
  sizeClassName[props.size],
  props.buttonType,
  props.light ? 'light' : '',
  {'type-rounded': props.rounded}
]
</script>

<template>
  <button 
    :class="buttonClass"
    :disabled="disabled"
    :type="props.type"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.dv-button {
  @apply inline-flex items-center rounded-md bg-primary-600 font-medium border border-transparent text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-900;

  &.size-md {
    @apply px-6 py-2.5 text-sm;
  }
  
  &.size-sm {
    @apply px-4 py-2.5 leading-4 text-sm;
  }
  
  &.size-xs {
    @apply px-4 py-2 text-xs;
  }
  
  &.size-lg {
    @apply px-6 py-2.5 text-base;
  }
  
  &.size-xl {
    @apply px-8 py-3 text-base;
  }

  &.primary {
    &.light {
      @apply text-primary-700 bg-primary-100 hover:bg-primary-200;
    }
  }

  &.accent {
    @apply bg-accent-600 hover:bg-accent-700 focus:ring-accent-500;

    &.light {
      @apply text-accent-700 bg-accent-100 hover:bg-accent-200;
    }
  }

  &.tertiary {
    @apply bg-tertiary-600 hover:bg-tertiary-700 focus:ring-tertiary-500;

    &.light {
      @apply text-tertiary-700 bg-tertiary-100 hover:bg-tertiary-200;
    }
  }

  &.quaternary {
    @apply bg-quaternary-600 hover:bg-quaternary-700 focus:ring-quaternary-500;

    &.light {
      @apply text-quaternary-700 bg-quaternary-100 hover:bg-quaternary-200;
    }
  }

  &.box {
    @apply bg-white hover:bg-slate-100 focus:ring-primary-500 border-gray-300 text-slate-700 border dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 dark:border-slate-600 dark:backdrop-blur dark:shadow-slate-900 dark:shadow-md;
  }

  &.transparent {
    @apply bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 text-slate-900 dark:text-white shadow-none;
  }

  &.transparent-primary {
    @apply bg-transparent hover:bg-primary-500 text-primary-600 shadow-none hover:bg-opacity-20;
  }

  &.transparent-accent {
    @apply bg-transparent text-accent-600 hover:bg-accent-500 shadow-none focus:ring-accent-500 hover:bg-opacity-20;
  }

  &.bg-theme {
    @apply bg-white text-slate-900 hover:bg-slate-100 focus:ring-white dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-700 dark:text-white;

    &.light {
      @apply text-slate-600 bg-slate-100 hover:bg-slate-200;
    }
  }

  &.bg-invert {
    @apply bg-slate-700 hover:bg-slate-600 focus:ring-slate-600 dark:bg-white dark:hover:bg-slate-100 dark:focus:ring-slate-50 dark:text-slate-800;
    
    &.light {
      @apply text-white bg-slate-500 hover:bg-slate-600;
    }
  }

  &.gradient-1 {
    @apply bg-gradient-to-bl from-primary-500 via-accent-500 to-tertiary-500 border-0 hover:from-primary-600 hover:via-accent-600 hover:to-tertiary-600;
  }

  &.gradient-2 {
    @apply bg-gradient-to-bl from-primary-500 via-primary-500 to-accent-500 border-0 hover:from-primary-600 hover:via-primary-600 hover:to-accent-600;
  }

  &.gradient-3 {
    @apply bg-gradient-to-bl from-accent-600 to-tertiary-500 via-accent-500 border-0 hover:from-accent-700 hover:to-tertiary-600 hover:via-accent-600;
  }

  &.gradient-4 {
    @apply bg-gradient-to-bl from-quaternary-600 to-primary-500 border-0 hover:from-quaternary-700 hover:to-primary-600;
  }

  &.light {
    @apply shadow-none;
  }

  &:disabled {
    @apply pointer-events-none text-gray-500 bg-gray-300 dark:text-gray-500 dark:bg-gray-700 shadow-none dark:shadow-none border-none;
  }

  &.type-rounded {
    @apply rounded-full;

    // &.size-xs {
    //   @apply px-3 py-1.5;
    // }

    // &.size-sm {
    //   @apply px-3.5 py-2;
    // }

    // &.size-lg {
    //   @apply px-5 py-2;
    // }

    // &.size-xl {
    //   @apply px-6 py-3;
    // }
  }
}

</style>