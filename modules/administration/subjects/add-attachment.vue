
<script lang="ts" setup>
import { useSharedVariable } from '.';
import { nanoid } from 'nanoid'
import { SelectInput } from '@nael/dls/src/types/select-input';
import { useUpdateSubjectAddDocumentMutation } from '~~/graphql';
const { addAttachmentState } = useSharedVariable()
const props = defineProps<{ refetch: () => {} }>()
const { mutate: updateAddDocument } = useUpdateSubjectAddDocumentMutation({ update: () => props.refetch() })

const loading = useComponentMutationLoading()
const formId = nanoid()
const route = useRoute()

const defaultValue: {
  name: string,
  attachmentId?: string,
  week?: number,
} = {
  name: '',
}

const input = ref({ ...defaultValue })
const selectedWeek = ref<SelectInput>()

const close = () => {
  addAttachmentState.value = false
  input.value = { ...defaultValue }
}

const modalText = computed(() => {
  return {
    title: "Add Document"
  }
})

const submit = async () => {
  const week = Number((selectedWeek.value?.value ?? 0))
  if (week > 0 && input.value.attachmentId) {
    await updateAddDocument({ input: { ...input.value, week: week, attachmentId: input.value.attachmentId!, _id: route.params.id as string } })
  }
  close()
}

const weekDropdown = ref<SelectInput[]>(Array.from(
  { length: 23 },
  (_, index) => ({ value: index + 1, label: `Week ${index + 1}` })
))

const newFileAdd = (id: string) => {
  input.value.attachmentId = id
}

const newFileRemove = (id: string) => {
  input.value.attachmentId = undefined
}
</script>

<template>
  <NlModal v-model="addAttachmentState" :title="modalText.title" subtitle="Add document to be shared across semester"
    @modal-close="close">
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <form :id="formId" @submit.prevent="submit">
        <NlTextfield v-model="input.name" label="Document Name" required class="mb-6" />
        <NlSelect v-model="selectedWeek" :data="weekDropdown" class="mb-6" label="Academic Week" required
          :include-avatar="false" />
        <div class="font-medium text-sm mb-2 text-gray-700">Upload Document</div>
        <ImageUpload :allow-multiple="false" file-types=""
          @new-file-add="newFileAdd" @file-remove="newFileRemove" />
      </form>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <NlButton button-type="box" :disabled="loading" @click="close">
          Close
        </NlButton>
        <NlButton type="submit" :form="formId" :disabled="loading">
          Add Document
        </NlButton>
      </div>
    </template>
  </NlModal>
</template>