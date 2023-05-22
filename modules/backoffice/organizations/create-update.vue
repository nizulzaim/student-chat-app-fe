<script lang="ts" setup>
import { useSharedVariable } from './shared';
import { nanoid } from 'nanoid'
import { useCreateOrganizationMutation, useOrganizationQuery, useUpdateOrganizationMutation, UpdateOrganizationInput, useUsersQuery, DayOfWeek } from '~~/graphql';
import { SelectInput } from '@nael/dls/src/types/select-input';
const { createUpdateState, isCreate, selectedId, organizationsRefetch } = useSharedVariable()
const { mutate: createOrganization, loading: createLoading } = useCreateOrganizationMutation({ update: () => organizationsRefetch() })
const { mutate: updateOrganization, loading: updateLoading } = useUpdateOrganizationMutation({ update: () => organizationsRefetch() })
const { result: organizationResult } = useOrganizationQuery({ args: { _id: selectedId } })
const { result: usersResult } = useUsersQuery({ query: {} })
const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()
const formId = nanoid()

const defaultValue: {
  name: string,
  isActive: boolean,
  operationalDays: DayOfWeek[]
} = {
  name: '',
  isActive: true,
  operationalDays: Object.values(DayOfWeek)
}

const input = ref({ ...defaultValue })

const close = () => {
  createUpdateState.value = false
  selectedId.value = undefined
  selectedUser.value = undefined
  input.value = { ...defaultValue }
}

const modalText = computed(() => {
  return {
    title: isCreate.value ? 'Register Organization' : 'Update Organization'
  }
})

watch(() => organizationResult.value, (val) => {
  if (val?.organization) {
    input.value = { ...val.organization }
    selectedUser.value = {
      value: val.organization.owner._id,
      label: val.organization.owner.displayName ?? '',
      description: val.organization.owner.email
    }
  }
})

const submit = async () => {
  if (isCreate.value) {
    await createOrganization({ input: { ...input.value, ownerId: selectedUser.value?.value } })
  } else {
    await updateOrganization({
      input: {
        ...transform<UpdateOrganizationInput>(input.value, ['name', 'isActive', 'operationalDays']),
        ownerId: selectedUser.value?.value,
        _id: selectedId.value
      }
    })
  }
  close()
}

const usersDropdown = computed<SelectInput[]>(() => {
  return usersResult.value?.users.items.map<SelectInput>((user) => ({
    value: user._id,
    label: user.displayName ?? '',
    description: user.email,
    avatar: user.pictureUrl,
    disabled: !user.isActive
  })) ?? []
})

const selectedUser = ref<SelectInput>()
</script>

<template>
  <NlModal
    v-model="createUpdateState"
    :title="modalText.title"
    subtitle="Manage Organization by adding account to the system. By default, account created will be customer type"
    @modal-close="close"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <form
        :id="formId"
        @submit.prevent="submit"
      >
        <NlTextfield
          v-model="input.name"
          label="Organization Name"
          required
          class="mb-6"
        />
        <NlSelect
          v-model="selectedUser"
          :data="usersDropdown"
          class="mb-6"
          label="Owner"
          required
        />
        <NlDaySelect
          v-model="input.operationalDays"
          class="mb-6"
        />
        <NlSwitch
          v-model="input.isActive"
          label="Activate the organization"
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