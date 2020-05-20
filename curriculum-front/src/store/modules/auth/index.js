import axios from '../../axiosConfig'

import router from '../../../router'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async login({ commit }, payload) {
      const res = await axios.post(
        `auth/login`,
        payload
      )
      localStorage.setItem('token', res.data.token)
      commit('updateUser', res.data)
      router.replace('/curricula')
    },
    async register({ commit }, payload) {
      const res = await axios.post(
        `auth/register`,
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
      commit('clearUserInfo')
      localStorage.removeItem('token')
      router.replace('/')
    },
    async getUser() {

    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = {
        ...state.user,
        ...payload
      }
    },
    clearUserInfo(state) {
      state.user = {}
    }
  },
  getters: {}
}
