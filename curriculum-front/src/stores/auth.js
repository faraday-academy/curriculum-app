import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from '@/utils/axiosConfig'
import router from '@/router'
import { useGeneralStore } from './general'

export const useAuthStore = defineStore('auth', () => {
  const generalStore = useGeneralStore()
  const user = ref({})

  async function login(payload) {
    try {
      generalStore.isLoading = true
      const res = await axios.post(`auth/login`, payload)
      localStorage.setItem('token', res.data.token)
      updateUser(res.data)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      router.replace('/curricula')
      generalStore.isLoading = false
    } catch (err) {
      console.error(err)
      const snackbar = {
        show: true,
        variant: 'error',
        message: 'Login failed.'
      }
      generalStore.isLoading = false
      generalStore.updateSnackbar(snackbar)
    }
  }

  async function register(payload) {
    await axios.post(`auth/register`, payload)
    updateUser({ email: payload.email })
    const snackbar = {
      show: true,
      variant: 'success',
      message: 'Sign up successful!'
    }
    generalStore.updateSnackbar(snackbar)
    router.replace('/verify')
  }

  async function verify(payload) {
    try {
      await axios.post(`auth/verify`, payload)
      router.replace('/login')
    } catch {
      const snackbar = {
        show: true,
        variant: 'error',
        message: 'Invalid Code'
      }
      generalStore.updateSnackbar(snackbar)
    }
  }

  async function logUserOut() {
    clearUserInfo()
    localStorage.removeItem('token')
    router.replace('/')
  }

  function updateUser(payload) {
    user.value = {
      ...user.value,
      ...payload
    }
  }

  function clearUserInfo() {
    user.value = {}
  }

  return {
    user,
    login,
    register,
    verify,
    logUserOut,
    updateUser,
    clearUserInfo
  }
}, {
  persist: true,
})
