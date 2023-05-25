<script lang="ts" setup>
import { useFocus } from '@vueuse/core';
import { useCreateConversationMutation, useUsersQuery } from '~~/graphql';

const $input = ref<HTMLInputElement | null>(null)
const router = useRouter()
const { user } = useCurrentUser()
const inputFocus = useFocus($input)
const inputData = ref()
const { result: usersResult, variables } = useUsersQuery({ query: { search: inputData.value }, sort: {} })
const { mutate } = useCreateConversationMutation({})

watch(() => inputData.value, (value) => {
  variables.value = { query: { search: value }, sort: {} }
})

const usersListing = computed(() => {
  return usersResult.value?.users?.items?.filter(i => i._id !== user.value?._id) ?? []
})

const onClick = async (selectedUser: { _id: string }) => {
  inputData.value = ''
  inputFocus.focused.value = false
  const data = await mutate({ input: { userIds: [selectedUser._id] } })

  if (data?.data?.createConversation) {
    router.push(`/conversation/${data.data.createConversation._id}`)
  }
}
</script>

<template>
  <div
    class="relative flex flex-1"
  >
    <label
      for="search-field"
      class="sr-only"
    >Search</label>
    <Icon
      name="mdi:magnify"
      class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
      aria-hidden="true"
    />
    <input
      ref="$input"
      v-model="inputData"
      class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
      placeholder="Search..."
      autocomplete="off"
      type="search"
      name="search"
    >
    <div
      class="w-full bg-white shadow-md left-0 top-16 rounded-b-md absolute max-w-5xl py-2"
      :class="{'hidden': !inputData}"
    >
      <div v-if="!inputData">
        <div class="p-6 text-slate-500 text-sm">
          Start search to interact with people
        </div>
      </div>
      <div v-else>
        <div
          v-for="cUser in usersListing"
          :key="cUser._id"
          @click="onClick(cUser)"
        >
          <div
            class="flex p-3 hover:bg-gray-100 cursor-pointer gap-3"
          >
            <NlAvatar />
            <div>
              <div class="text-slate-600 text-sm font-medium">
                {{ cUser.displayName }}
              </div>
              <div class="text-slate-500 text-sm">
                {{ cUser.email }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>