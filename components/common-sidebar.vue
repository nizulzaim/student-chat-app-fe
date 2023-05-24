<script lang="ts" setup>
import { useConversationsQuery } from '~~/graphql'

const { result } = useConversationsQuery({ input: {}, sort: {} })
const { user } = useCurrentUser()

type ConversationsList = {
  _id: string
  name: string
  email: string
  imageUrl?: string
}
const conversationsLists = computed<ConversationsList[]>(() => {
  return result.value?.conversations?.items?.filter(i => i.users.length > 1).map(i => {
    const interactIds = i.users.filter(id => id._id !== user.value?._id)

    return {
      name: interactIds[0].displayName,
      email: interactIds[0].email,
      _id: i._id
    }
  }) ?? []
})
</script>

<template>
  <ul
    role="list"
    class="divide-y divide-gray-100"
  >
    <li
      v-for="list in conversationsLists"
      :key="list.email"
    >
      <NuxtLink
        :to="`/conversation/${list._id}`"
        class="flex gap-x-4 py-5 px-6 cursor-pointer chat-list-item"
      >
        <NlAvatar
          :src="list.imageUrl"
          class="flex-none"
        />
        <div class="min-w-0">
          <p class="text-sm font-semibold leading-4 text-gray-900">
            {{ list.name }}
          </p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">
            {{ list.email }}
          </p>
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