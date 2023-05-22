<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Overview',
  menuItems: [
    { name: 'Overview', description: 'Learn about tips, product updates and company culture.', href: '/administration', icon: 'ph:gear-duotone' },
    { name: 'Manage Users', description: 'Learn about tips, product updates and company culture.', href: '/administration/users', icon: 'ph:user-circle-duotone' },
    { name: 'Manage User Groups', description: 'Learn how to maximize our platform to get the most out of it.', href: '/administration/user-groups', icon: "ph:users-duotone" },
  ],
})
</script>