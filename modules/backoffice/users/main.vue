<script lang="ts" setup>
import { useSharedVariable } from './shared';
import CreateUpdate from './create-update.vue'
import { useDateFormat } from '@vueuse/core'
const searchText = ref('')
const { createUpdateState, users, usersLoading: loading, updateSearch, usersResult, defaultQuery, selectedId } = useSharedVariable()
const showDetails = (id: string) => {
  selectedId.value = id
  createUpdateState.value = true
}
</script>

<template>
  <NuxtLayout>
    <template #search>
      <div class="flex gap-2 items-center">
        <NlTextfield
          v-model="searchText"
          placeholder="Search"
          required
          class="w-56"
          no-label
          @update-search="updateSearch"
        >
          <template #leadingIcon>
            <Icon
              name="mdi:magnify"
              class="w-5 h-5"
            />
          </template>
        </NlTextfield>
        <NlButton
          size="sm"
          button-type="gradient-4"
          class="shadow-lg shadow-primary-500/50"
          @click="createUpdateState = true"
        >
          Register User
        </NlButton>
      </div>
    </template>
    <div class="py-6">
      <NlDatatable>
        <template
          v-if="loading || users.length > 0"
          #head
        >
          <NlTh>
            <span class="sr-only">Avatar</span>
          </NlTh>
          <NlTh>Full Name</NlTh>
          <NlTh>Last Update At</NlTh>
          <NlTh>Status</NlTh>
          <NlTh>
            <span class="sr-only">Action</span>
          </NlTh>
        </template>

        <NlTrow
          v-for="index in 5"
          v-if="loading"
          :key="index"
        >
          <NlTcol>
            <NlLoader class="w-40 h-6" />
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-40 h-6" />
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-40 h-6" />
          </NlTcol>
          <NlTcol class="w-20">
            <NlLoader class="w-10 h-8" />
          </NlTcol>
        </NlTrow>

       
        <ClientOnly v-if="!loading">
          <NlTrow
            v-for="user in users"
            :key="user._id"
          >
            <NlTcol class="w-20">
              <NlAvatar
                circle
                :src="user.pictureUrl"
                size="sm"
              />
            </NlTcol>
            <NlTcol>
              <div class="font-medium text-gray-800">
                {{ user.displayName }}
              </div>
              <div>{{ user.email }}</div>
            </NlTcol>
            <NlTcol>{{ useDateFormat(user.updatedAt, 'DD MMM YYYY HH:mm A').value }}</NlTcol>
            <NlTcol>
              <NlBadge
                v-if="user.isActive"
                color="green"
                :circle="false"
              >
                Active
              </NlBadge>
              <NlBadge
                v-else
                color="amber"
                :circle="false"
              >
                Not Active
              </NlBadge>
            </NlTcol>
            <NlTcol class="w-20">
              <NlButton
                button-type="box"
                size="xs"
                class="shadow"
                @click="showDetails(user._id)"
              >
                <Icon
                  name="material-symbols:edit-document-outline"
                  class="text-gray-700"
                />
              </NlButton>
            </NlTcol>
          </NlTrow>
        </ClientOnly>
        <template #footer>
          <NlPagination
            :data="usersResult?.users"
            @next="defaultQuery.page++"
            @previous="defaultQuery.page--"
          />
        </template>
      </NlDatatable>
      <div v-if="!loading && users.length === 0">
        <EmptyState
          title="No User found"
          subtitle="Create new user to get started"
          button-text="Register User"
          :button-event="() => createUpdateState = true"
        />
      </div>
      <CreateUpdate />
    </div>
  </NuxtLayout>
</template>

