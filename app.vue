<script lang="ts" setup>
import { provideApolloClient } from '@vue/apollo-composable';
import {apolloClient} from './apollo'
import { useIntervalFn } from '@vueuse/core';
import { loginRequest } from './msal/config';
provideApolloClient(apolloClient())

useIntervalFn(() => {
  const { instance } = useMsal()
  const cookie = useCookie('apollo:default.token', { path: '/' })

  instance.acquireTokenSilent(loginRequest).then((response) => {
    cookie.value = response.idToken
  })
}, 60000 * 5)
</script>

<template>
  <NlAppWrapper>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NlAppWrapper>
</template>
