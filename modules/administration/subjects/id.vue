<script lang="ts" setup>
import CreateUpdate from './create-update.vue'
import { useSharedVariable } from '.';
import { useDateFormat } from '@vueuse/core'
import { UpdateSubjectInput, useFacultiesQuery, useSubjectQuery, useUpdateSubjectMutation } from '~~/graphql';
import { SelectInput } from '~~/packages/nael-dls/src/types/select-input';
import { nanoid } from 'nanoid';

const route = useRoute()
const { createUpdateState, subjects, subjectsResult, defaultQuery, query, subjectsRefecth } = useSharedVariable()
const { result: subjectResult, refetch: subjectRefecth } = useSubjectQuery({ query: { _id: route.params.id as string } }, {fetchPolicy: 'network-only' })
const { mutate: updateSubject } = useUpdateSubjectMutation({ update: () => subjectRefecth() && subjectsRefecth() })
const { result: facultiesResult } = useFacultiesQuery({ query: {} });

const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()
const formId = nanoid()
const selectedFaculty = ref<SelectInput>()

const defaultValue: {
  name: string,
  isActive: boolean,
  code: string,
} = {
  name: '',
  code: "",
  isActive: true,
}

const input = ref({ ...defaultValue })

const close = () => {
  createUpdateState.value = false
  query._id = ""
  input.value = { ...defaultValue }
}

watch(() => subjectResult.value, (val) => {
  if (val?.subject) {
    input.value = { ...val.subject }
    selectedFaculty.value = {
      value: val.subject.facultyId,
      label: val.subject.faculty.name,
      disabled: !val.subject.faculty.isActive
    }
  }
})

const submit = async () => {
  await updateSubject({
    input: {
      ...transform<UpdateSubjectInput>(input.value, ['name', 'isActive', 'code']),
      facultyId: selectedFaculty.value?.value,
      _id: route.params.id as string
    }
  })
  close()
}

const facultiesDropdown = computed<SelectInput[]>(() => {
  return facultiesResult.value?.faculties.items.map<SelectInput>((data) => ({
    value: data._id,
    label: data.name,
    disabled: !data.isActive
  })) ?? []
})

</script>

<template>
  <div>
    <div class="mb-10">
      <div class="text-3xl font-semibold">
        View Subject
      </div>
      <div class="text-lg">
        {{ subjectResult?.subject.name }}
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div class="shadow p-6 rounded-lg border border-slate-100">
        <form
          :id="formId"
          @submit.prevent="submit"
        >
          <NlTextfield
            v-model="input.name"
            label="Subject Name"
            required
            class="mb-6"
          />
          <NlTextfield
            v-model="input.code"
            label="Subject Code"
            required
            class="mb-6"
          />
          <NlSelect
            v-model="selectedFaculty"
            :data="facultiesDropdown"
            class="mb-6"
            label="Faculty"
            required
            :include-avatar="false"
          />
          <NlSwitch
            v-model="input.isActive"
            label="Activate the subject"
          />
          <div class="flex flex-row-reverse border-t-slate-200 border-t pt-3 mt-3">
            <NlButton
              type="submit"
              :form="formId"
              :disabled="loading"
            >
              {{ isCreate ? 'Create' : 'Update' }}
            </NlButton>
          </div>
        </form>
      </div>
    </div>

    <div>
      <div class="mt-6 font-semibold text-lg">
        Attachment List
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
  </div>
</template>