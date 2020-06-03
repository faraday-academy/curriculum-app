import axios from './axiosConfig'
import router from '../router'

export default {
  async getCurricula({ commit }) {
    const res = await axios.get('curricula')
    commit('updateCurricula', res.data)
  },
  async getUserCurricula({ commit }, userId) {
    const res = await axios.get(`users/${userId}/curricula`)
    commit('updateCurricula', res.data)
  },
  async postCurriculum({ commit }, curriculum) {
    const res = await axios.post(
      'curricula',
      curriculum
    )
    commit('appendCurriculum', res.data)
    router.push(`/curricula/${res.data._id}`)
  },
  async patchCurriculum({ commit }, payload) {
    const { curriculumId, body } = payload
    const res = await axios.patch(`curricula/${curriculumId}`, body)
    // commit('updateCurriculum', payload)
  },
  async deleteCurriculum({ commit }, curriculumId) {
    const res = await axios.delete(`curricula/${curriculumId}`)
    console.log(res)
    commit('removeCurriculum', curriculumId)
  },
  async postSection({ commit }, payload) {
    const { curriculumId, body } = payload
    const res = await axios.post(
      `curricula/${curriculumId}/sections`,
      body
    )
    let updatedPayload = {...payload}
    updatedPayload.body = res.data
    commit('updateSection', updatedPayload)
  },
  async deleteSection({ commit }, payload) {
    const { curriculumId, sectionId } = payload
    await axios.delete(
      `curricula/${curriculumId}/sections/${sectionId}`
    )
    commit('removeSection', payload)
  },
  async postItem({ commit }, payload) {
    let { curriculumId, sectionId, type, body } = payload
    const res = await axios.post(
      `curricula/${curriculumId}/sections/${sectionId}/${type}`,
      body
    )

    // doing this because I need the object Id returned from Mongo
    payload.body = res.data
    commit('upsertItem', payload)
  },
  async putItem({ commit }, payload) {
    const { curriculumId, sectionId, itemId, type, body } = payload
    const res = await axios.patch(
      `curricula/${curriculumId}/sections/${sectionId}/${type}/${itemId}`,
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
      `curricula/${curriculum._id}/sections/${sectionId}/${type}/${item._id}`,
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
      `curricula/${curriculumId}/sections/${sectionId}/${type}/${itemId}`
    )
    console.log(res)
    commit('removeItem', payload)
  },
  async countAllCompleted({ commit }) {
    const res = await axios.get(
      `count`
    )
    commit('updateCount', res.data)
  }
}
