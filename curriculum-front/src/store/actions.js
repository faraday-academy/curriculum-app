import axios from 'axios'

import router from '../router'

const BASE_URL = 'http://localhost:5000/api/v1'
const API_URL = `${BASE_URL}/curricula`

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
  async postItem({ commit }, payload) {
    let { curriculumId, sectionId, type, body } = payload
    const res = await axios.post(
      `${API_URL}/${curriculumId}/sections/${sectionId}/${type}`,
      body
    )

    // doing this because I need the object Id returned from Mongo
    payload.body = res.data
    commit('upsertItem', payload)
  },
  async putItem({ commit }, payload) {
    const { curriculumId, sectionId, itemId, type, body } = payload
    const res = await axios.patch(
      `${API_URL}/${curriculumId}/sections/${sectionId}/${type}/${itemId}`,
      body
    )
    commit('upsertItem', payload)
  },
  async patchItem({ commit }, payload) {
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
    commit('upsertItem', curriculum)
  },
  async deleteItem({ commit }, payload) {
    const {
      curriculumId,
      type,
      sectionId,
      itemId
    } = payload
    console.log(payload)
    const res = await axios.delete(
      `${API_URL}/${curriculumId}/sections/${sectionId}/${type}/${itemId}`
    )
    console.log(res)
    commit('removeItem', payload)
  },
  async countAllCompleted({ commit }) {
    console.log(`${API_URL}/count`)
    const res = await axios.get(
      `${BASE_URL}/count`
    )
    commit('updateCount', res.data)
  }
}
