import type { useToast } from 'primevue/usetoast'

export function useSnackbar() {
  function createToastService() {
    const nuxtApp = useNuxtApp()
    return nuxtApp.vueApp.config.globalProperties.$toast
  }
  const openSuccessSnackbar = (message: string) => {
    const toast = createToastService()
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
      group: 'top-right',
    })
  }

  const openWarningSnackbar = (message: string) => {
    const toast = createToastService()
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 3000,
      group: 'top-right',
    })
  }

  const openErrorSnackbar = (message: string = 'Wystąpił błąd') => {
    console.log('openErrorSnackbar')
    const toast = createToastService()
    console.log('toast', toast)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
      group: 'top-right',
    })
  }

  return {
    openSuccessSnackbar,
    openWarningSnackbar,
    openErrorSnackbar,
  }
}
