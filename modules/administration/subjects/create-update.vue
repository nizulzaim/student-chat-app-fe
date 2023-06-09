
<script lang="ts" setup>
import { useSharedVariable } from '.';
import { nanoid } from 'nanoid'
import { SelectInput } from '@nael/dls/src/types/select-input';
import { UpdateSubjectInput, useCreateSubjectMutation, useFacultiesQuery, useSubjectQuery, useUpdateSubjectMutation } from '~~/graphql';
import { RangeDate } from '~~/packages/nael-dls/src/types/range-date';
import { addWeeks, startOfWeek } from 'date-fns';
const { createUpdateState, isCreate, query, subjectsRefecth } = useSharedVariable()
const { mutate: createSubject } = useCreateSubjectMutation({ update: () => subjectsRefecth() })
const { mutate: updateSubject } = useUpdateSubjectMutation({ update: () => subjectsRefecth() })
const { result: subjectResult } = useSubjectQuery({ query: query })
const {result: facultiesResult} = useFacultiesQuery({query: {}});

const startDate = startOfWeek(new Date(), { weekStartsOn: 0 })
const endDate = addWeeks(startDate, 19)
const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()
const formId = nanoid()
const selectedFaculty = ref<SelectInput>()
const datePicker = ref<RangeDate>([startDate, endDate])

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

const modalText = computed(() => {
  return {
    title: isCreate.value ? 'Register Subject' : 'Update Subject'
  }
})

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
  if (isCreate.value) {
    await createSubject({ input: { ...input.value, facultyId: selectedFaculty.value?.value } })
  } else {
    if (!query._id) return;
    await updateSubject({
      input: {
        ...transform<UpdateSubjectInput>(input.value, ['name', 'isActive', 'code']),
        facultyId: selectedFaculty.value?.value,
        _id: query._id
      }
    })
  }
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
  <NlModal
    v-model="createUpdateState"
    :title="modalText.title"
    subtitle="Manage Subject by adding new subject to chat app"
    @modal-close="close"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
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
        <NlDatepicker
          v-model="datePicker"
          label="Hello World"
          class="mb-6"
        />
        <NlSwitch
          v-model="input.isActive"
          label="Activate the subject"
        />
      </form>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <NlButton
          button-type="box"
          :disabled="loading"
          @click="close"
        >
          Close
        </NlButton>
        <NlButton
          type="submit"
          :form="formId"
          :disabled="loading"
        >
          {{ isCreate? 'Create': 'Update' }}
        </NlButton>
      </div>
    </template>
  </NlModal>
</template>