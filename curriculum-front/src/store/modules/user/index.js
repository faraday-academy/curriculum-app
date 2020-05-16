import axios from '../../axiosConfig'

import router from '../../../router'

export default {
  namespaced: true,
  state: {
  },
  actions: {
    async updateUser({ commit, rootState }, payload) {
      const res = await axios.patch(
        `users/${rootState.auth.user.id}`,
        payload
      )
      commit('auth/updateUser', payload, { root: true })
    }
  },
  mutations: {
  },
  getters: {}
}
