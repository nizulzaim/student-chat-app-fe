<template>
  <slot />
  <div
    id="toast-container"
    class="fixed inset-0 flex flex-col space-y-4 items-end justify-end px-4 py-6 pointer-events-none sm:p-6"
  />
</template>

<style lang="scss">

#toast-container {
  & > * {
    @apply w-full flex flex-col items-center space-y-4 sm:items-end;
  }
}

</style>