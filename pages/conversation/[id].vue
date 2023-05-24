
<script setup lang="ts">
import { useCreateMessageMutation, useMessagesQuery, useMessageAddedSubscription } from '~~/graphql';
import { useTimeAgo } from '@vueuse/core'

definePageMeta({
  layout: 'dashboard',
  title: 'Mohamad Nizul Zaim Anuar',
})
const route = useRoute()
const { user } = useCurrentUser()
const { result, refetch } = useMessagesQuery({ input: { conversationId: route.params.id as string, limit: 100 }, sort: {} })
const { mutate } = useCreateMessageMutation({ update: () => refetch() })
const $chatbox = ref()
type MessageList = {
  _id: string
  content: string
  createdAt: Date
  formatedCreatedAt: globalThis.ComputedRef<string>
  createdById: string
  conversationId: string
}
const messageLists = ref<MessageList[]>([])


const updateMessageLists = ({smooth = true}: {smooth?: boolean}) => {
  messageLists.value = result.value?.messages?.items?.map(i => {
    return {
      _id: i._id,
      content: i.text,
      createdAt: i.createdAt,
      createdById: i.createdById,
      conversationId: i.conversationId,
      formatedCreatedAt: useTimeAgo(i.createdAt).value
    }
  }).reverse() ?? []
  setTimeout(() => {
    scrollToBottom($chatbox.value as HTMLDivElement, true)
  }, 200)
}

watch(() => result.value, (value) => {
  updateMessageLists({smooth: true})
})

updateMessageLists({smooth: false})
const input = ref('')
const submit = async () => {
  if (input.value.trim() === '') return;
  messageLists.value.push({
    _id: 'temp',
    content: input.value,
    createdAt: new Date(),
    createdById: user.value?._id as string,
    conversationId: route.params.id as string,
    formatedCreatedAt: useTimeAgo(new Date()).value
  })
  const tempText = input.value
  input.value = ''

  setTimeout(() => {
    scrollToBottom($chatbox.value as HTMLDivElement, true)
  }, 200)

  await mutate({
    input: {
      text: tempText,
      conversationId: route.params.id as string
    }
  })
}

const { result: addedResult } = useMessageAddedSubscription({ conversationId: route.params.id as string })

function scrollToBottom(element: HTMLDivElement, smooth = false) {
  element.scroll({ top: element.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
}

watch(() => addedResult.value, async (value) => {
  console.log(value)
  if (value?.messageAdded?.conversationId === route.params.id) {
    await refetch()
  }
})

</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col flex-grow w-full h-96 overflow-hidden">
      <div
        ref="$chatbox"
        class="overflow-auto flex flex-grow"
      >
        <div
          v-if="user"
          class="flex flex-col flex-grow h-0 p-4  max-w-5xl mx-auto w-full"
        >
          <div
            v-for="message in messageLists"
            :key="message._id"
          >
            <div
              v-if="user._id !== message.createdById"
              class="flex w-full mt-2 space-x-3 max-w-xl"
            >
              <NlAvatar class="flex-shrink-0" />
              <div>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p class="text-sm">
                    {{ message.content }}
                  </p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{{ message.formatedCreatedAt }}</span>
              </div>
            </div>
            <div
              v-else
              class="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end"
            >
              <div>
                <div class="bg-accent-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p class="text-sm">
                    {{ message.content }}
                  </p>
                </div>
                <span class="text-xs text-gray-500 leading-none">{{ message.formatedCreatedAt }}</span>
              </div>
              <NlAvatar class="flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-100 p-4">
        <div class=" max-w-5xl w-full mx-auto">
          <form @submit.prevent="submit">
            <input
              v-model="input"
              class="flex items-center h-10 w-full rounded px-3 text-sm border-0 focus:border-1"
              type="text"
              placeholder="Type your message…"
            >
          </form>
        </div>
      </div>
    </div>
    <template #sidebar>
      <CommonSidebar />
    </template>
  </NuxtLayout>
</template>

