
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Mohamad Nizul Zaim Anuar',
})
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col flex-grow w-full h-96 overflow-hidden">
      <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div class="flex w-full mt-2 space-x-3 max-w-xl">
          <NlAvatar class="flex-shrink-0" />
          <div>
            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p class="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
          </div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end">
          <div>
            <div class="bg-accent-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <p class="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
              </p>
            </div>
            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
          </div>
          <NlAvatar class="flex-shrink-0" />
        </div>
      </div>

      <div class="bg-gray-200 p-4">
        <input
          class="flex items-center h-10 w-full rounded px-3 text-sm border-0 focus:border-1"
          type="text"
          placeholder="Type your message…"
        >
      </div>
    </div>
    <template #sidebar>
      <CommonSidebar />
    </template>
  </NuxtLayout>
</template>
