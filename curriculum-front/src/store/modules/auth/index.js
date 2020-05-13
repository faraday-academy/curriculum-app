import axios from 'axios'

import router from '../../../router'

const AUTH_URL = 'http://localhost:5000/api/v1/auth'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async login({ commit }, payload) {
      const res = await axios.post(
        `${AUTH_URL}/login`,
        payload
      )
      localStorage.setItem('token', res.data.token)
      commit('updateUser', res.data)
      router.replace('/curricula')
    },
    async register({ commit }, payload) {
      const res = await axios.post(
        `${AUTH_URL}/register`,
        payload
      )
      const snackbar = {
        show: true,
        message: 'Sign up successful!'
      }
      commit('updateSnackbar', snackbar, { root: true })
      router.replace('/login')
    },
    async logUserOut({ commit }, payload) {
      commit('updateUser', {})
      localStorage.removeItem('token')
      router.replace('/')
    },
    async getUser() {

    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    }
  },
  getters: {}
}
