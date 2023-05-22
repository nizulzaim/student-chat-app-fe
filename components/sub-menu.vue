<script lang="ts" setup>
type Props = {
  items: {
    icon: string,
    name: string,
    description: string,
    href: string,
  }[]
}

const props = defineProps<Props>()
</script>

<template>
  <HdPopover
    v-slot="{ open, close }"
    class="relative"
  >
    <HdPopoverButton
      :class="[open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset- p-2']"
    >
      <!-- <span>Modules</span> -->
      <Icon
        name="iconoir:menu-scale"
        class="w-6 h-6"
      />
    </HdPopoverButton>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <HdPopoverPanel class="absolute left-0 z-10 mt-3 w-screen max-w-sm transform px-2 sm:px-0">
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <NuxtLink
              v-for="item in props.items"
              :key="item.name"
              :to="item.href"
              class="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50 flex items-center"
              @click="close"
            >
              <div>
                <Icon
                  :name="item.icon"
                  class="h-8 w-8 text-slate-500 mr-6"
                />
              </div>
              <div>
                <p class="text-base font-medium text-gray-900">
                  {{ item.name }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </HdPopoverPanel>
    </transition>
  </HdPopover>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply hover:bg-primary-50;

  svg {
    @apply text-primary-500;
  }

  p {
    @apply text-primary-500;
  }
}
</style>