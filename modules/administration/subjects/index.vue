<script lang="ts" setup>
import CreateUpdate from './create-update.vue'
import { useSharedVariable } from '.';
import { useDateFormat } from '@vueuse/core'
const searchText = ref('')
const { createUpdateState, subjects, subjectsLoading: loading, updateSearch, subjectsResult, defaultQuery, query } = useSharedVariable()
const router = useRouter()

const showDetails = (id: string) => {
  query._id = id
  router.push(`/administration/subjects/${id}`)
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-10">
      <div class="text-3xl font-semibold">
        Manage Subjects
      </div>
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
          button-type="primary"
          class="shadow-lg shadow-primary-500/50"
          @click="createUpdateState = true"
        >
          Add Subject
        </NlButton>
      </div>
    </div>

    <div class="py-6">
      <NlDatatable>
        <template
          v-if="loading || subjects.length > 0"
          #head
        >
          <NlTh>Subject Name</NlTh>
          <NlTh>Subject Code</NlTh>
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
            <NlLoader class="w-20 h-6" />
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-40 h-6" />
          </NlTcol>
          <NlTcol class="w-20">
            <NlLoader class="w-10 h-8" />
          </NlTcol>
        </NlTrow>

        <ClientOnly>
          <NlTrow
            v-for="faculty in subjects"
            :key="faculty._id"
          >
            <NlTcol>
              {{ faculty.name }}
            </NlTcol>
            <NlTcol>
              {{ faculty.code }}
            </NlTcol>
            <NlTcol>{{ useDateFormat(faculty.updatedAt, 'DD MMM YYYY HH:mm A').value }}</NlTcol>
            <NlTcol>
              <NlBadge
                v-if="faculty.isActive"
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
                @click="() => showDetails(faculty._id)"
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
            :data="subjectsResult?.subjects"
            @next="defaultQuery.page++"
            @previous="defaultQuery.page--"
          />
        </template>
      </NlDatatable>
      <div v-if="!loading && subjects.length === 0">
        <EmptyState
          title="No Organization found"
          subtitle="Create new organization to get started"
          button-text="Register Organization"
          :button-event="() => createUpdateState = true"
        />
      </div>
      <CreateUpdate />
    </div>
  </div>
</template>