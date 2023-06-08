
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Mohamad Nizul Zaim Anuar',
})
</script>

<template>
  <NuxtLayout>
    <div class="flex w-full flex-col overflow-hidden p-20 items-center justify-items-center align-middle">
      <div>
        <img
          src="~/assets/img/begin_chat.svg"
          class="bg-cover h-96"
        >
        <div class="text-center text-3xl font-semibold mt-10">
          Let's Begin Chat
        </div>
      </div>
    </div>
    <template #sidebar>
      <CommonSidebar />
    </template>
  </NuxtLayout>
</template>
