<script lang="ts" setup>
import { useLoginWithPasswordMutation } from '~~/graphql'
import { loginRequest } from '~~/msal/config';
import UserInfo from '~~/types/user-info';
import { InteractionRequiredAuthError, InteractionStatus, BrowserAuthError } from "@azure/msal-browser";

const inputValue = ref({
  email: '',
  password: ''
})

const { onLogin } = useApollo()
const router = useRouter()

onBeforeMount(async() => {
  const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated.value) {
    return router.replace('/conversation')
  }

  await getGraphData()
})

const { instance, inProgress } = useMsal();

const state = reactive({
	resolved: false,
	data: {} as UserInfo
});

async function getGraphData() {
  const response = await instance.acquireTokenSilent({
    ...loginRequest
  }).catch(async (e) => {
    if (e instanceof InteractionRequiredAuthError || e instanceof BrowserAuthError) {
      console.log('interaction required')
      await instance.acquireTokenRedirect(loginRequest);
    }
    throw e;
  });
	if (inProgress.value === InteractionStatus.None) {
		const graphData = await useCallMsGraph(response.accessToken);
     await onLogin(response.idToken)
		state.data = graphData;
		state.resolved = true;
		stopWatcher();
	}
}

const stopWatcher = watch(inProgress, () => {
	if (!state.resolved) {
		return getGraphData();
	}
  return router.replace('/conversation')
});


const { mutate: loginWithPassword } = useLoginWithPasswordMutation({})

const onLoginWithPassword = async () => {
  const result = await loginWithPassword({ input: inputValue.value })

  if (result?.data?.loginWithPassword) {
    await onLogin(result.data.loginWithPassword.token)
  }

  inputValue.value = {
    email: '',
    password: ''
  }
}

</script>

<template>
  <div class="flex min-h-full bg-white dark:bg-slate-900 flex-row-reverse">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto mx-auto"
            src="~/assets/img/logo-normal.png"
            alt="Your Company"
          >
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 text-center">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-8">
          <div>
            <div>
              <div class="mt-1 grid grid-cols-1 gap-3">
                <div>
                  <NlButton
                    button-type="box"
                    class="inline-flex w-full justify-center shadow"
                  >
                    <Icon
                      name="logos:google-icon"
                      class="h-4 w-4 mr-3"
                    />
                    <span>Sign in with Google</span>
                  </NlButton>
                </div>
              </div>
            </div>

            <div class="relative mt-6">
              <div
                class="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <form
              class="space-y-6"
              @submit.prevent="onLoginWithPassword"
            >
              <div>
                <NlTextfield
                  v-model="inputValue.email"
                  label="Email Address"
                  required
                />
              </div>

              <div class="space-y-1">
                <NlTextfield
                  v-model="inputValue.password"
                  label="Password"
                  required
                  type="password"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  >
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >Remember me</label>
                </div>

                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-primary-600 hover:text-primary-500"
                  >Forgot your password?</a>
                </div>
              </div>

              <div>
                <NlButton
                  type="submit"
                  class="flex w-full justify-center"
                >
                  Sign in
                </NlButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-auto object-cover"
        src="~/assets/img/cover-page.jpg"
        alt=""
      >
      <div class="absolute top-0 left-0 w-full h-full crystalline z-50 opacity-100" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.crystalline {
  background-color: #423c5a80;
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
}
</style>
