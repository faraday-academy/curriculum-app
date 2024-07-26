import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '../../axiosConfig'
import router from '../../../router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})

  async function login(payload) {
    try {
      this.updateLoadingStatus(true, { root: true })
      const res = await axios.post(`auth/login`, payload)
      localStorage.setItem('token', res.data.token)
      updateUser(res.data)
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      router.replace('/curricula')
      this.updateLoadingStatus(false, { root: true })
    } catch (err) {
      console.error(err)
      const snackbar = {
        show: true,
        variant: 'error',
        message: 'Login failed.'
      }
      this.updateLoadingStatus(false, { root: true })
      this.updateSnackbar(snackbar, { root: true })
    }
  }

  async function register(payload) {
    const res = await axios.post(`auth/register`, payload)
    updateUser({ email: payload.email })
    const snackbar = {
      show: true,
      variant: 'success',
      message: 'Sign up successful!'
    }
    this.updateSnackbar(snackbar, { root: true })
    router.replace('/verify')
  }

  async function verify(payload) {
    try {
      const res = await axios.post(`auth/verify`, payload)
      router.replace('/login')
    } catch (err) {
      const snackbar = {
        show: true,
        variant: 'error',
        message: 'Invalid Code'
      }
      this.updateSnackbar(snackbar, { root: true })
    }
  }

  async function logUserOut(payload) {
    clearUserInfo()
    localStorage.removeItem('token')
    router.replace('/')
  }

  async function getUser() {
    // Your implementation here
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
    getUser,
    updateUser,
    clearUserInfo
  }
}, {
  persist: true,
})
