import axios from 'axios'

import router from '../router'

const API_URL = 'http://localhost:5000/api/v1/curricula'

export default {
  async getCurricula({ commit }) {
    const res = await axios.get(API_URL)
    commit('updateCurricula', res.data)
  },
  async postCurriculum({ commit }, curriculum) {
    const res = await axios.post(API_URL, curriculum)
    commit('appendCurriculum', res.data)
    router.push(`/curricula/${res.data._id}`)
  }
}
