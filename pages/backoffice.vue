<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  title: 'Overview',
  menuItems: [
    { name: 'Overview', description: 'Learn about tips, product updates and company culture.', href: '/backoffice', icon: 'ph:gear-duotone' },
    { name: 'Manage Users', description: 'Learn about tips, product updates and company culture.', href: '/backoffice/users', icon: 'ph:user-circle-duotone' },
    {
      name: 'Manage Organizations',
      description: 'Get all of your questions answered in our forums of contact support.',
      href: '/backoffice/organizations',
      icon: 'ph:buildings-duotone'
    },
    { name: 'Manage User Groups', description: 'Learn how to maximize our platform to get the most out of it.', href: '/backoffice/user-groups', icon: "ph:users-duotone" },
  ],
})
</script>