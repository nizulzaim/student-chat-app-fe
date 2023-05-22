import { createVNode, getCurrentInstance, render } from "vue";
import { sleep } from "../utils/sleep";
import ToastComponent from '../components/toast.vue'

export const useToast = function () {
  const instance = getCurrentInstance()
  const run = async ({ text, type }: { text: string; type?: 'simple' | 'success' | 'error' | 'info' | 'warn' }) => {
    if (!type)
      type = 'simple'
    const toastContainer = document.querySelector('#toast-container')
    const div = document.createElement('div')
    if (!toastContainer || !instance)
      return

    toastContainer.appendChild(div)

    const vnode = createVNode(ToastComponent, { message: text, type })
    render(vnode, div)

    await sleep(5000)
    vnode.component?.exposed?.close()
    await sleep(1000)
    toastContainer.removeChild(div)
  }
  return {
    run,
  }
}