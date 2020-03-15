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
  },
  async patchCurriculum({ commit }, payload) {
    const { curriculumId, body } = payload
    const res = await axios.patch(`${API_URL}/${curriculumId}`, body)
    // commit('updateCurriculum', payload)
  },
  // async patchSection({ commit }, payload) {
  //   const { curriculumId, body } = payload
  //   const res = await axios.patch(`${API_URL}/${curriculumId}`, body)
  //   commit('updateCurriculum', payload)
  // },
  async patchType({ commit }, payload) {
    const {
      curriculum,
      type,
      sectionId,
      item
    } = payload
    const res = await axios.patch(
      `${API_URL}/${curriculum._id}/sections/${sectionId}/${type}/${item._id}`,
      item
    )
    commit('updateCurriculum', curriculum)
  }
}
