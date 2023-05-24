<script lang="ts" setup>
import { useConversationsQuery, useConversationUpdatedSubscription } from '~~/graphql'

const { result, refetch } = useConversationsQuery({ input: {}, sort: {} })
const { user } = useCurrentUser()
const {variables, result: subsResult} = useConversationUpdatedSubscription({userId: user.value?._id as string ?? ''})
type ConversationsList = {
  _id: string
  name: string
  email: string
  imageUrl?: string
  unread: number
}
const conversationsLists = computed<ConversationsList[]>(() => {
  return result.value?.conversations?.items?.filter(i => i.users.length > 1).map(i => {
    const interactIds = i.users.filter(id => id._id !== user.value?._id)

    return {
      name: interactIds[0].displayName,
      email: interactIds[0].email,
      unread: i.numberOfUnread,
      _id: i._id
    }
  }) ?? []
})

watch(() => subsResult.value, () => {
  refetch()
})

watch(() => user.value, (value) => {
  if (value) {
    variables.value = {userId: value._id}
  }
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
        <div class="flex flex-grow items-center justify-between">
          <div class="min-w-0">
            <p
              class="text-sm font-medium leading-4 text-gray-900"
              :class="[list.unread ? 'font-semibold': 'font-medium']"
            >
              {{ list.name }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ list.email }}
            </p>
          </div>
          <div class="w-6">
            <span
              v-if="list.unread > 0"
              class="inline-flex items-center rounded-full bg-accent-900 px-2 py-1 text-xs font-medium text-white"
            >{{ list.unread }}</span>
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