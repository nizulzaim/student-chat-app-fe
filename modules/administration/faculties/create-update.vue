
<script lang="ts" setup>
import { useSharedVariable } from '.';
import { nanoid } from 'nanoid'
import { UpdateFacultyInput, useCreateFacultyMutation, useFacultyQuery, useUpdateFacultyMutation } from '~~/graphql';
const { createUpdateState, isCreate, query, facultiesRefecth } = useSharedVariable()
const { mutate: createFaculty } = useCreateFacultyMutation({ update: () => facultiesRefecth() })
const { mutate: updateFaculty } = useUpdateFacultyMutation({ update: () => facultiesRefecth() })
const { result: facultyResult } = useFacultyQuery({ query: query })
const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()
const formId = nanoid()

const defaultValue: {
  name: string,
  isActive: boolean,
  slug: string,
} = {
  name: '',
  slug: '',
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
    title: isCreate.value ? 'Register Faculty' : 'Update Faculty'
  }
})

watch(() => facultyResult.value, (val) => {
  console.log('hello')
  if (val?.faculty) {
    input.value = { ...val.faculty }
  }
})

const submit = async () => {
  if (isCreate.value) {
    await createFaculty({ input: { ...input.value } })
  } else {
    if (!query._id) return;
    await updateFaculty({
      input: {
        ...transform<UpdateFacultyInput>(input.value, ['name', 'isActive', 'slug']),
        _id: query._id
      }
    })
  }
  close()
}
</script>

<template>
  <NlModal
    v-model="createUpdateState"
    :title="modalText.title"
    subtitle="Manage Faculty by adding new faculty to chat app"
    @modal-close="close"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <form
        :id="formId"
        @submit.prevent="submit"
      >
        <NlTextfield
          v-model="input.name"
          label="Faculty Name"
          required
          class="mb-6"
        />
        <NlSwitch
          v-model="input.isActive"
          label="Activate the faculty"
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