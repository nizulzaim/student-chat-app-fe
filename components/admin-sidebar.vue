<script lang="ts" setup>
const { user } = useCurrentUser()
type MenuItem = {
  _id: string
  name: string
  icon: string;
}
const menuLists = ref<MenuItem[]>([{
  _id: "/administration/faculties",
  name: "Manage Faculties",
  icon: "fluent:building-20-filled"
}, {
  _id: "/administration/subjects",
  name: "Manage Subjects",
  icon: "gridicons:book"
}])
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-100"
  >
    <li
      v-for="list in menuLists"
      :key="list._id"
    >
      <NuxtLink
        :to="list._id"
        class="flex gap-x-4 py-5 px-6 cursor-pointer chat-list-item"
      >
        <Icon
          :name="list.icon"
          class="w-6 h-6"
        />
        <div class="flex flex-grow items-center justify-between">
          <div class="min-w-0">
            <p class="text-sm font-normal leading-4 text-gray-900">
              {{ list.name }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss">
.chat-list-item {
  @apply hover:bg-slate-100;

  &.router-link-exact-active {
    @apply bg-slate-200;
  }
}
</style>