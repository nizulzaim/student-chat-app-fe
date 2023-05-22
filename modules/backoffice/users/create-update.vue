<script lang="ts" setup>
import { useSharedVariable } from './shared';
import { nanoid } from 'nanoid'
import { useCreateUserMutation, useUserQuery, useUpdateUserMutation, UpdateUserInput } from '~~/graphql';
const { createUpdateState, isCreate, selectedId, usersRefetch } = useSharedVariable()
const { mutate: createUser } = useCreateUserMutation({ update: () => usersRefetch() })
const { mutate: updateUser } = useUpdateUserMutation({ update: () => usersRefetch() })
const { result: userResult } = useUserQuery({ args: { _id: selectedId } })
const { transform } = useObjectTransform()
const loading = useComponentMutationLoading()

const formId = nanoid()

const defaultValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isActive: true,
}

const input = ref({ ...defaultValue })

const close = () => {
  createUpdateState.value = false
  selectedId.value = undefined
  input.value = { ...defaultValue }
}

const modalText = computed(() => {
  return {
    title: isCreate.value ? 'Register User' : 'Update User'
  }
})

watch(() => userResult.value, (val) => {
  if (val?.user) {
    input.value = { ...val.user, password: '' }
  }
})

const submit = async () => {
  if (isCreate.value) {
    await createUser({ input: { ...input.value } })
  } else {
    await updateUser({
      input: {
        ...transform<UpdateUserInput>(input.value, ['firstName', 'lastName', 'isActive']),
        _id: selectedId.value
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
    subtitle="Manage User by adding account to the system. By default, account created will be customer type"
    @modal-close="close"
  >
    <div class="absolute inset-0 py-6 px-4 sm:px-6">
      <form
        :id="formId"
        @submit.prevent="submit"
      >
        <div class="flex gap-2 w-full">
          <NlTextfield
            v-model="input.firstName"
            label="First Name"
            required
            class="mb-4 flex-1"
          />
          <NlTextfield
            v-model="input.lastName"
            label="Last Name"
            required
            class="mb-4 flex-1"
          />
        </div>
        <NlTextfield
          v-model="input.email"
          label="Email"
          required
          class="mb-4"
          :disabled="!isCreate"
        />
        <NlTextfield
          v-if="isCreate"
          v-model="input.password"
          label="Password"
          type="password"
          required
          class="mb-4"
        />
        <NlSwitch
          v-model="input.isActive"
          label="Activate the user"
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