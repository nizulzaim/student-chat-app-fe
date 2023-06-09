
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { UserType } from '~~/graphql';

const navigation = ref([
  { name: 'Dashboard', href: '/conversation', icon: 'uim:comment-alt-message', current: true },
  
]);

const userNavigation = [
  { name: 'Your profile', href: '' },
  { name: 'Sign out', href: '#' },
]

const { user } = useCurrentUser()
const sidebarOpen = ref(false)

watch(() => user.value, () => {
  if (user.value?.type === UserType.Lecturer) {
    navigation.value.push({ name: 'Lecturer', href: '/lecturer', icon: "uim:user-nurse", current: false },)
  }

  if (user.value?.type === UserType.Admin) {
    navigation.value.push({ name: 'Settings', href: '/administration', icon: "uim:briefcase", current: false },)
  }
})
</script>

<template>
  <div class="h-full overflow-hidden">
    <TransitionRoot
      as="template"
      :show="sidebarOpen"
    >
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <Icon name="material-symbols:cancel-rounded" />
                  </button>
                </div>
              </TransitionChild>

              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="~/assets/img/utm-logo.svg"
                    alt="Your Company"
                  >
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul
                    role="list"
                    class="-mx-2 flex-1 space-y-1"
                  >
                    <li
                      v-for="item in navigation"
                      :key="item.name"
                    >
                      <a
                        :href="item.href"
                        :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']"
                      >
                        <Icon :name="item.icon" />
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4"
    >
      <div class="flex h-16 shrink-0 items-center justify-center">
        <img
          class="h-8 w-auto"
          src="~/assets/img/utm-logo.svg"
          alt="Your Company"
        >
      </div>
      <nav class="mt-8">
        <ul
          role="list"
          class="flex flex-col items-center space-y-1"
        >
          <li
            v-for="item in navigation"
            :key="item.name"
          >
            <RouterLink
              :to="item.href"
              class="text-gray-200 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
            >
              <Icon
                :name="item.icon"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <span class="sr-only">{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="lg:pl-20 h-full flex flex-col">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Icon
            name="material-symbols:menu" 
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <!-- Separator -->
        <div
          class="h-6 w-px bg-gray-900/10 lg:hidden"
          aria-hidden="true"
        />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <DashboardSearch />
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">View notifications</span>
              <Icon
                name="material-symbols:notifications-rounded"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>

            <!-- Separator -->
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="relative"
            >
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                >
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm font-medium leading-6 text-gray-900"
                    aria-hidden="true"
                  >{{ user?.displayName }}</span>
                  <Icon
                    name="mdi:chevron-down"
                    class="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                    >
                      {{ item.name }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="xl:pl-96 flex-1 flex flex-col">
        <slot />
      </main>
    </div>

    <aside
      class="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 xl:block z-10 shadow-lg shadow-gray-400/20"
    >
      <slot name="sidebar" />
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-accent-800/40 text-white;
}
</style>