
<script lang="ts" setup>
import { useConversationQuery, useDownloadSignedAttachmentUrlMutation } from '~~/graphql';

type Props  = {
  modelValue: boolean;
}
const route = useRoute()
const props = defineProps<Props>()
const modalState = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const { result: conversationResult } = useConversationQuery({ input: { _id: route.params.id as string } })
const { mutate: downloadUrl } = useDownloadSignedAttachmentUrlMutation()

watch(() => props.modelValue, (val) => {
  modalState.value = val
})

watch(() => modalState.value, (val) => {
  emits('update:modelValue', val)
})

const weekLists = ref<number[]>(Array.from(
  { length: 23 },
  (_, index) => index + 1
))

const conversationAttachments = computed(() => conversationResult.value?.conversation.semesterClass?.subject.weekAttachments ?? [])

const downloadDocument = async (id: string) => {
  const data = await downloadUrl({ id })
  if (!data?.data?.downloadSignedAttachmentUrl) return;

  window.open(data.data.downloadSignedAttachmentUrl, '_blank')
}
</script>

<template>
  <NlModal
    v-model="modalState"
    title="View Documents"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <div v-for="week in weekLists" :key="week" class="mb-6">
        <div class="mb-4 uppercase font-semibold text-slate-500 text-sm">Week {{ week }}</div>
        <div class="mb-2" v-for="conversationAttachment in conversationAttachments.filter(i => i.week === week)" :key="conversationAttachment.attachmentId">
          <div class="border p-4 rounded-lg">
            <div class="flex justify-between">
              <div>
                <div class="text-sm">{{ conversationAttachment.name }}</div>
                <div class="text-sm text-slate-500">{{ conversationAttachment.attachmentInfo.filename }}</div>
              </div>
              <NlButton size="xs" button-type="box" @click="downloadDocument(conversationAttachment.attachmentId)">
                <Icon name="ic:twotone-download" class="w-4 h-4 text-accent-900"/>
              </NlButton>
            </div>
          </div>
        </div>
        <div v-if="conversationAttachments.filter(i => i.week === week).length === 0" class="bg-slate-200 p-6 text-slate-400 font-medium rounded-lg text-sm">
          No Document Found
        </div>

      </div>
      <!-- <form
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
      </form> -->
    </div>
    <template #footer>
      <div class="flex gap-2">
        <NlButton
          button-type="box"
          @click="modalState = false"
        >
          Close
        </NlButton>
      </div>
    </template>
  </NlModal>
</template>