<script lang="ts" setup>
import { useSharedVariable } from './shared';
import CreateUpdate from './create-update.vue'
import { useDateFormat } from '@vueuse/core'
const searchText = ref('')
const { createUpdateState, organizations, organizationsLoading: loading, updateSearch, organizationsResult, defaultQuery, selectedId } = useSharedVariable()
const showDetails = (id: string) => {
  selectedId.value = id
  createUpdateState.value = true
}
</script>

<template>
  <NuxtLayout>
    <template #search>
      <div class="flex gap-2 items-center">
        <NlTextfield v-model="searchText" placeholder="Search" required class="w-56" no-label
          @update-search="updateSearch">
          <template #leadingIcon>
            <Icon name="mdi:magnify" class="w-5 h-5" />
          </template>
        </NlTextfield>
        <NlButton size="sm" button-type="gradient-4" class="shadow-lg shadow-primary-500/50"
          @click="createUpdateState = true">Register Organization</NlButton>
      </div>
    </template>
    <div class="py-6">
      <NlDatatable>
        <template #head v-if="loading || organizations.length > 0">
          <NlTh>Organization Name</NlTh>
          <NlTh>Owner</NlTh>
          <NlTh>Last Update At</NlTh>
          <NlTh>Status</NlTh>
          <NlTh>
            <span class="sr-only">Action</span>
          </NlTh>
        </template>

        <NlTrow v-if="loading" v-for="index in 5" :key="index">
          <NlTcol>
            <NlLoader class="w-40 h-6"></NlLoader>
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-40 h-6"></NlLoader>
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-40 h-6"></NlLoader>
          </NlTcol>
          <NlTcol class="w-20">
            <NlLoader class="w-10 h-8"></NlLoader>
          </NlTcol>
        </NlTrow>

        <ClientOnly>
          <NlTrow v-if="!loading" v-for="organization in organizations" :key="organization._id">
            <NlTcol>
              <div class="font-medium text-gray-600">{{ organization.name }}</div>
              <div>{{ organization.internalName }}</div>
            </NlTcol>
            <NlTcol>
              <div class="flex items-center">
                <NlAvatar circle :src="organization.owner.pictureUrl" size="sm"></NlAvatar>
                <div class="ml-3">
                  <div class="font-medium text-gray-600">{{ organization.owner.displayName }}</div>
                  <div>{{ organization.owner.email }}</div>
                </div>
              </div>
            </NlTcol>
            <NlTcol>{{ useDateFormat(organization.updatedAt, 'DD MMM YYYY HH:mm A').value }}</NlTcol>
            <NlTcol>
              <NlBadge v-if="organization.isActive" color="green" :circle="false">Active</NlBadge>
              <NlBadge v-else color="amber" :circle="false">Not Active</NlBadge>
            </NlTcol>
            <NlTcol class="w-20">
              <NlButton button-type="box" size="xs" class="shadow" @click="showDetails(organization._id)">
                <Icon name="material-symbols:edit-document-outline" class="text-gray-700"></Icon>
              </NlButton>
            </NlTcol>
          </NlTrow>
        </ClientOnly>
        <template #footer>
          <NlPagination :data="organizationsResult?.organizations" @next="defaultQuery.page++"
            @previous="defaultQuery.page--"></NlPagination>
        </template>
      </NlDatatable>
      <div v-if="!loading && organizations.length === 0">
        <EmptyState title="No Organization found" subtitle="Create new organization to get started"
          button-text="Register Organization" :button-event="() => createUpdateState = true" />
      </div>
      <CreateUpdate />
    </div>
  </NuxtLayout>

</template>

