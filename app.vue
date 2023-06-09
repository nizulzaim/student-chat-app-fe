<script lang="ts" setup>
import useApolloClient from './apollo'
useApolloClient()
</script>

<template>
  <NlAppWrapper>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NlAppWrapper>
</template>
