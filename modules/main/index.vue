<script lang="ts" setup>
import { loginRequest } from '~~/msal/config';
import UserInfo from '~~/types/user-info';
import { InteractionRequiredAuthError, InteractionStatus, BrowserAuthError } from "@azure/msal-browser";

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

const stopWatcher = watch(() => inProgress.value, () => {
	if (!state.resolved) {
		return getGraphData();
	}
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
    router.replace('/conversation')
		stopWatcher();
	}
}

</script>

<template>
  <div class="flex min-h-full bg-white dark:bg-slate-900 items-center justify-center relative">
    <div class="bg-accent-900 z-50 rounded-lg shadow-lg p-12 flex items-center justify-items-center">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-60 h-60 text-accent-700 animate-spin dark:text-gray-600 fill-primary-500"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <div class="text-white text-2xl text-center mt-10 font-medium">
          Loading...
        </div>
      </div>
    </div>
    <div class="absolute top-0 w-full h-full hidden flex-1 lg:block overflow-hidden z-10">
      <img
        class="absolute inset-0 w-full h-auto object-cover"
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

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 200px;
  height: 200px;
  margin: 8px;
  border: 16px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
