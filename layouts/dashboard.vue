
<script setup lang="ts">
const { onLogout, getToken } = useApollo()

const route = useRoute()
const router = useRouter()
const { user } = useCurrentUser()

const isTokenAvailable = ref(false)

onMounted(async () => {
  const token = await getToken()
  if (!token) return router.replace('/')
  isTokenAvailable.value = true
})

const navigation = [
  { name: 'Overview', href: '/overview', icon: 'ic:twotone-home' },
  { name: 'Dashboard', href: '/dashboard', icon: 'ic:twotone-space-dashboard' },
  { name: 'Administration', href: '/administration', icon: 'ic:twotone-admin-panel-settings' },
  { name: 'Backoffice Administration', href: '/backoffice', icon: 'ic:twotone-settings' },
]

const logout = async () => {
  await onLogout()
  router.replace('/')
}

</script>

<template>
  <!-- Component Start -->
  <div
    v-if="isTokenAvailable"
    class="flex h-full"
  >
    <div class="flex flex-col items-center w-80 h-full text-slate-400 shadow-xl z-50">
      <div class="w-full overflow-hidden h-full flex flex-col bg-gray-800">
        <a
          class="flex items-center w-full px-6 mt-3"
          href="#"
        >
          <svg
            class="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          <span class="ml-2 text-sm font-bold">The App</span>
        </a>
        <div class="w-full px-5">
          <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <NuxtLink
              v-for="nav, index in navigation"
              :key="index"
              class="flex items-center w-full h-12 px-3 mt-2 rounded-lg hover:bg-slate-700"
              :to="nav.href"
            >
              <Icon
                :name="nav.icon"
                class="h-6 w-6 mr-2"
              />
              <span class="ml-2 text-sm font-medium">{{ nav.name }}</span>
            </NuxtLink>
          </div>
        </div>
        <a
          class="flex items-center w-full py-3 mt-auto px-3"
          href="#"
        >
          <div class="flex items-center justify-between hover:bg-gray-700 w-full h-20 px-2 rounded-lg">
            <div class="flex items-center">
              <NlAvatar
                :src="user?.pictureUrl"
                circle
                size="lg"
              />
              <div>
                <div class="ml-4 text-sm font-medium text-white">{{ user?.displayName }}</div>
                <div class="ml-4 text-sm">{{ user?.email }}</div>
              </div>
            </div>
            <Icon
              name="iconoir:arrow-separate-vertical"
              class="w-5 h-5"
            />
          </div>
        </a>
      </div>
    </div>
    <main class="grow z-10">
      <div class="flex mx-auto max-w-8xl px-4 sm:px-6 md:px-8 items-center justify-between h-16">
        <div class="flex items-center">
          <SubMenu
            v-if="route.meta.menuItems"
            :items="route.meta.menuItems"
            class="mr-4"
          />
          <h1 class="text-2xl font-semibold text-gray-900 mr-6">
            {{ route.meta.title }}
          </h1>
        </div>
        <div class="flex gap-3">
          <slot name="search" />
        </div>
      </div>
      <div class="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
        <!-- Replace with your content -->
        <slot />
        <!-- /End replace -->
      </div>
    </main>
  </div>
  <!-- Component End  -->
</template>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-slate-700 text-white;
}

.group:focus .group-focus\:visible {
  display: block;
}
</style>