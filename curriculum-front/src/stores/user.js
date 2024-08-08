import { defineStore } from 'pinia'

import { useAuthStore } from './auth'
import { useGeneralStore } from './general'
import axios from '@/utils/axiosConfig'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const generalStore = useGeneralStore()

  const updateUser = async (payload) => {
    await axios.patch(
      `users/${authStore.user.id}`,
      payload
    )
    authStore.updateUser(payload)
  }

  const updateUserPassword = async (payload) => {
    const res = await axios.post(
      `users/${authStore.user.id}/update-password`,
      payload
    )
    const message = res.status == 200
      ? 'Update password successful!'
      : 'Update password failed.'
    const snackbar = {
      show: true,
      message
    }
    generalStore.updateSnackbar(snackbar)
  }

  return {
    updateUser,
    updateUserPassword,
  }
})
