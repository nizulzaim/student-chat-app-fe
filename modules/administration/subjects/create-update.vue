
<script lang="ts" setup>
import { useSharedVariable } from '.';
import { nanoid } from 'nanoid'
import { SelectInput } from '@nael/dls/src/types/select-input';
import { useCreateSubjectMutation, useFacultiesQuery, useUpdateSubjectMutation } from '~~/graphql';
const { createUpdateState, subjectsRefetch } = useSharedVariable()
const { mutate: createSubject } = useCreateSubjectMutation({ update: () => subjectsRefetch() })
const {result: facultiesResult} = useFacultiesQuery({query: {}});

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
  input.value = { ...defaultValue }
}

const modalText = computed(() => {
  return {
    title: 'Register Subject',
  }
})


const submit = async () => {
  await createSubject({ input: { ...input.value, facultyId: selectedFaculty.value?.value } })
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
          Create
        </NlButton>
      </div>
    </template>
  </NlModal>
</template>