<script lang="ts" setup>
import { provideApolloClient } from '@vue/apollo-composable';
import {apolloClient} from './apollo'
provideApolloClient(apolloClient())
</script>

<template>
  <NlAppWrapper>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NlAppWrapper>
</template>
