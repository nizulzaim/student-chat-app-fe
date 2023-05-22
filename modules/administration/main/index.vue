<script lang="ts" setup>
import { useUpdateCurrentOrganizationMutation } from '~~/graphql';
import { useSharedVariable } from './shared'

const { input, currentOrganization } = useSharedVariable()

const { mutate } = useUpdateCurrentOrganizationMutation({})
const toast = useToast()
const onSubmit = async () => {
  await mutate({ input })
  toast.run({ text: 'Successfully update company info', type: 'success' })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="bg-white shadow sm:rounded-lg  mt-10">
      <div class="md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Company Profile
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div>
            <NlTextfield
              v-model="input.name"
              label="Company Name"
              required
            />
            <!-- <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p> -->
          </div>

          <div>
            <label
              for="about"
              class="block text-sm font-medium text-gray-700"
            >Company Unique Identifier</label>
            <div class="mt-1 text-sm py-2">
              <div class="font-medium leading-6">
                @{{ currentOrganization?.internalName }}
              </div>
            </div>
            <!-- <NlTextfield v-model="currentOrganization?.internalName" label="Company Unique Identifier" required disabled /> -->
          </div>

          <div>
            <label
              for="about"
              class="block text-sm font-medium text-gray-700"
            >Owner</label>
            <div class="mt-1 flex items-center gap-4">
              <NlAvatar :src="currentOrganization?.owner.pictureUrl" />
              <div class="text-sm text-slate-600">
                <div class="font-medium">
                  {{ currentOrganization?.owner.displayName }}
                </div>
                <div>{{ currentOrganization?.owner.email }}</div>
              </div>
            </div>
            <!-- <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p> -->
          </div>
        </div>
      </div>
      <hr>
      <div class="px-4 py-5 sm:p-6 flex justify-end">
        <NlButton type="submit">
          Save
        </NlButton>
      </div>
    </div>
  </form>
</template>