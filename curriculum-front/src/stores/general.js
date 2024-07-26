import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalStore', () => {
  const snackbarOptions = ref({
    show: false,
    variant: '',
    message: '',
  })
  const isLoading = ref(false)

  return {
    snackbarOptions,
    isLoading,
  };
})
