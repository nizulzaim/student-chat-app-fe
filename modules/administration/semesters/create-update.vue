
<script lang="ts" setup>
import { useSharedVariable } from '.';
import { nanoid } from 'nanoid'
import { RangeDate } from '~~/packages/nael-dls/src/types/range-date';
import { UpdateSemesterInput, useCreateSemesterMutation, useSemesterQuery, useUpdateSemesterMutation } from '~~/graphql';
import { addWeeks, startOfWeek } from 'date-fns';
const { createUpdateState, isCreate, query, semestersRefecth } = useSharedVariable()
const { mutate: createSemester } = useCreateSemesterMutation({ update: () => semestersRefecth() })
const { mutate: updateSemester } = useUpdateSemesterMutation({ update: () => semestersRefecth() })
const { result: semesterResult } = useSemesterQuery({ query: query })

const startDate = startOfWeek(new Date(), { weekStartsOn: 0 })
const endDate = addWeeks(startDate, 19)
const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()
const formId = nanoid()
const datePicker = ref<RangeDate>([startDate, endDate])

const defaultValue: {
  name: string,
  isActive: boolean,
} = {
  name: '',
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
    title: isCreate.value ? 'Register Semester' : 'Update Semester'
  }
})

watch(() => semesterResult.value, (val) => {
  if (val?.semester) {
    input.value = { ...val.semester }
  }
})

const submit = async () => {
  if (isCreate.value) {
    await createSemester({ input: { ...input.value, startDate: datePicker.value[0], endDate: datePicker.value[1] } })
  } else {
    if (!query._id) return;
    await updateSemester({
      input: {
        ...transform<UpdateSemesterInput>(input.value, ['name', 'isActive']),
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
    subtitle="Manage Semester by adding new semester to chat app"
    @modal-close="close"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <form
        :id="formId"
        @submit.prevent="submit"
      >
        <NlTextfield
          v-model="input.name"
          label="Semester Name"
          required
          class="mb-6"
        />
        <NlDatepicker
          v-model="datePicker"
          label="Hello World"
          class="mb-6"
        />
        <NlSwitch
          v-model="input.isActive"
          label="Activate the semester"
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