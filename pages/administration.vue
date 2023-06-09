<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  title: 'Mohamad Nizul Zaim Anuar',
})
</script>

<template>
  <NuxtLayout>
    <div class="p-10 mx-auto w-full">
      <NuxtPage />
    </div>

    <template #sidebar>
      <AdminSidebar />
    </template>
  </NuxtLayout>
</template>