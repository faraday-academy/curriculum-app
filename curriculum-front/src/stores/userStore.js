import { defineStore } from 'pinia'
import axios from '../../axiosConfig'

export const useUserStore = defineStore('user', () => {
  const updateUser = async (payload) => {
    const res = await axios.patch(
      `users/${this.$state.auth.user.id}`,
      payload
    )
    this.auth.updateUser(payload)
  }

  const updateUserPassword = async (payload) => {
    const res = await axios.post(
      `users/${this.$state.auth.user.id}/update-password`,
      payload
    )
    const message = res.status == 200
      ? 'Update password successful!'
      : 'Update password failed.'
    const snackbar = {
      show: true,
      message
    }
    this.updateSnackbar(snackbar)
  }

  return {
    state,
    updateUser,
    updateUserPassword,
  }
})
