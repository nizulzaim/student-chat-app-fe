<script lang="ts" setup>
import { useSharedVariable } from '.';
import { useDateFormat } from '@vueuse/core'
import { UpdateSubjectInput, useFacultiesQuery, useSubjectQuery, useUpdateSubjectMutation, useDownloadSignedAttachmentUrlMutation } from '~~/graphql';
import { SelectInput } from '~~/packages/nael-dls/src/types/select-input';
import { nanoid } from 'nanoid';
import AddAttachment from './add-attachment.vue';

const route = useRoute()

const { addAttachmentState, subjectsRefetch, } = useSharedVariable()
const { mutate: updateSubject } = useUpdateSubjectMutation({ update: () => subjectRefetch() && subjectsRefetch() })
const { result: facultiesResult } = useFacultiesQuery({ query: {} });
const { result: subjectResult, refetch: subjectRefetch, variables: subjectVariables } = useSubjectQuery({ query: { _id: route.params.id } }, { fetchPolicy: 'network-only' })
const { mutate: downloadUrl } = useDownloadSignedAttachmentUrlMutation()

const { transform } = useObjectTransform()
const loading = useComponentQueryLoading()
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

const updateSubjectForm = () => {
  const val = subjectResult.value;
  if (!val?.subject) return;
  input.value = { ...val.subject }
  selectedFaculty.value = {
    value: val.subject.facultyId,
    label: val.subject.faculty.name,
    disabled: !val.subject.faculty.isActive
  }
}

onMounted(() => nextTick(() => {
  if (subjectVariables.value) {
    subjectVariables.value.query._id = route.params.id as string
    subjectRefetch(subjectVariables.value)
  }
  updateSubjectForm()
}
))

watch(() => subjectResult.value, (val) => {
  updateSubjectForm()
}, { deep: true })

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

const currentSubject = computed(() => subjectResult.value?.subject)
const weekAttachments = computed(() => currentSubject.value?.weekAttachments ?? [])

const downloadDocument = async (id: string) => {
  const data = await downloadUrl({ id })
  if (!data?.data?.downloadSignedAttachmentUrl) return;

  window.open(data.data.downloadSignedAttachmentUrl, '_blank')
}
</script>

<template>
  <div>
    <div class="mb-10">
      <div class="text-3xl font-semibold">
        View Subject
      </div>
      <div class="text-lg">
        {{ subjectResult?.subject?.name }}
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div class="shadow p-6 rounded-lg border border-slate-100">
        <form :id="formId" @submit.prevent="submit">
          <NlTextfield v-model="input.name" label="Subject Name" required class="mb-6" />
          <NlTextfield v-model="input.code" label="Subject Code" required class="mb-6" />
          <NlSelect v-model="selectedFaculty" :data="facultiesDropdown" class="mb-6" label="Faculty" required
            :include-avatar="false" />
          <NlSwitch v-model="input.isActive" label="Activate the subject" />
          <div class="flex flex-row-reverse border-t-slate-200 border-t pt-3 mt-3">
            <NlButton type="submit" :form="formId" :disabled="loading">
              {{ isCreate ? 'Create' : 'Update' }}
            </NlButton>
          </div>
        </form>
      </div>
    </div>

    <div>
      <div class="flex justify-between">
        <div class="mt-6 font-semibold text-lg">
          Attachment List
        </div>
        <div>
          <NlButton size="sm" @click="addAttachmentState = true">
            Add Document
          </NlButton>
        </div>
      </div>
      <div class="py-6">
        <NlDatatable>
          <template v-if="loading || weekAttachments.length > 0" #head>
            <NlTh>Document Name</NlTh>
            <NlTh>Week</NlTh>
            <NlTh>Created Info</NlTh>
          </template>

          <NlTrow v-for="index in 5" v-if="loading" :key="index">
            <NlTcol>
              <NlLoader class="w-40 h-6" />
            </NlTcol>
            <NlTcol>
              <NlLoader class="w-20 h-6" />
            </NlTcol>
            <NlTcol>
              <NlLoader class="w-40 h-6" />
            </NlTcol>
            <NlTh>
              <span class="sr-only">Action</span>
            </NlTh>
            <NlTcol class="w-20">
              <NlLoader class="w-10 h-8" />
            </NlTcol>
          </NlTrow>

          <ClientOnly v-if="!loading">
            <NlTrow v-for="attachment, index in weekAttachments" :key="index">
              <NlTcol>
                <div class="flex gap-4 items-center">
                  <Icon name="solar:document-bold-duotone" class="w-6 h-6" />
                  <div>
                    <div class="font-semibold">{{ attachment.name }}</div>
                    <div class="text-sm text-gray-400">{{ attachment.attachmentInfo.filename }}</div>
                  </div>
                </div>
              </NlTcol>
              <NlTcol>
                {{ `Week ${attachment.week}` }}
              </NlTcol>
              <NlTcol>
                <div>{{ useDateFormat(attachment.createdAt, 'DD MMM YYYY HH:mm A').value }}</div>
                <div>{{ attachment.attachmentInfo.createdBy.displayName }}</div>
              </NlTcol>
              <NlTcol class="w-20">
                <NlButton button-type="box" size="xs" class="shadow" @click="downloadDocument(attachment.attachmentId)">
                  <Icon name="solar:file-download-bold-duotone" class="text-primary-700 w-5 h-5" />
                </NlButton>
              </NlTcol>
            </NlTrow>
          </ClientOnly>
        </NlDatatable>
        <div v-if="!loading && weekAttachments.length === 0">
          <EmptyState title="No Document found" subtitle="Create new document to get started" button-text="Add Document"
            :button-event="() => addAttachmentState = true" />
        </div>
        <AddAttachment v-model="addAttachmentState" :refetch="() => subjectRefetch" />
      </div>
    </div>
  </div>
</template>