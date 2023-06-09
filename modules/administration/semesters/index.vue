<script lang="ts" setup>
import CreateUpdate from './create-update.vue'
import { useSharedVariable } from '.';
import { useDateFormat } from '@vueuse/core'
const searchText = ref('')
const { createUpdateState, semesters, semestersLoading: loading, updateSearch, semestersResult, defaultQuery, query } = useSharedVariable()

const showDetails = (id: string) => {
  query._id = id
  createUpdateState.value = true
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-10">
      <div class="text-3xl font-semibold">
        Manage Semesters
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
          Add Semester
        </NlButton>
      </div>
    </div>

    <div class="py-6">
      <NlDatatable>
        <template
          v-if="loading || semesters.length > 0"
          #head
        >
          <NlTh>Semester Name</NlTh>
          <NlTh>Start Date</NlTh>
          <NlTh>End Date</NlTh>
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
            <NlLoader class="w-32 h-6" />
          </NlTcol>
          <NlTcol>
            <NlLoader class="w-32 h-6" />
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
            v-for="item in semesters"
            :key="item._id"
          >
            <NlTcol>
              {{ item.name }}
            </NlTcol>
            <NlTcol>{{ useDateFormat(item.startDate, 'DD MMMM YYYY').value }}</NlTcol>
            <NlTcol>{{ useDateFormat(item.endDate, 'DD MMMM YYYY').value }}</NlTcol>
            <NlTcol>{{ useDateFormat(item.updatedAt, 'DD MMM YYYY HH:mm A').value }}</NlTcol>
            <NlTcol>
              <NlBadge
                v-if="item.isActive"
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
                @click="() => showDetails(item._id)"
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
            :data="semestersResult?.semesters"
            @next="defaultQuery.page++"
            @previous="defaultQuery.page--"
          />
        </template>
      </NlDatatable>
      <div v-if="!loading && semesters.length === 0">
        <EmptyState
          title="No Semester found"
          subtitle="Create new semester to get started"
          button-text="Add Semester"
          :button-event="() => createUpdateState = true"
        />
      </div>
      <CreateUpdate />
    </div>
  </div>
</template>