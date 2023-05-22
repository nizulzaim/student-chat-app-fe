<template>
  <div
    data-placeholder
    class="overflow-hidden relative bg-gray-300 rounded"
  />
</template>

<style lang="scss" scoped>
[data-placeholder]::after {
  content: " ";
  box-shadow: 0 0 50px 9px rgba(254, 254, 254);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  animation: load 500ms infinite;
}

@keyframes load {
  0% {
    left: -100%
  }

  100% {
    left: 150%
  }
}
</style>
