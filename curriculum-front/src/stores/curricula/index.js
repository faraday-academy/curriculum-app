import { defineStore } from 'pinia'
import { ref } from 'vue'

import axios from '@/utils/axiosConfig'
import router from '@/router'

export const useCurriculumStore = defineStore('curriculum', () => {
  const state = ref({
    curricula: [],
    curriculaMeta: {},
    completeCounts: [],
    selectedCurriculum: {},
  })

  const getCurriculum = async (id) => {
    const { data } = await axios.get(`curricula/${id}`)
    console.log(data)
    const curr = { ...data.curriculum, createdByName: data.createdByName }
    console.log(curr)
    state.value.selectedCurriculum = curr
  }

  const getCurricula = async (payload) => {
    const { currentPage, userId } = payload
    let res = {}
    if (userId) {
      res = await axios.get(`users/${userId}/curricula?page=${currentPage}`)
    } else {
      res = await axios.get(`curricula?page=${currentPage}`)
    }

    let meta = { ...res.data }
    delete meta.docs
    state.value.curriculaMeta = meta
    if (currentPage === 1) {
      state.value.curricula = res.data.docs
    } else {
      state.value.curricula.push(...res.data.docs)
    }
  }

  const postCurriculum = async (curriculum) => {
    const res = await axios.post('curricula', curriculum)
    state.value.curricula.push(res.data)
    router.push(`/curricula/${res.data._id}`)
  }

  const patchCurriculum = async () => {
    const { _id: curriculumId } = state.value.selectedCurriculum
    await axios.patch(`curricula/${curriculumId}`, state.value.selectedCurriculum)
  }

  const deleteCurriculum = async (curriculumId) => {
    await axios.delete(`curricula/${curriculumId}`)
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    state.value.curricula.splice(cIndex, 1)
  }

  const postSection = async (payload) => {
    const { curriculumId, body } = payload
    const res = await axios.post(`curricula/${curriculumId}/sections`, body)
    let updatedPayload = { ...payload }
    updatedPayload.body = res.data
    updateSection(updatedPayload)
  }

  const patchSection = async (payload) => {
    const { curriculumId, section } = payload
    await axios.patch(`curricula/${curriculumId}/sections/${section._id}`, { goal: section.goal, name: section.name })
    // commit('upsertSection', section)
  }

  const deleteSection = async (payload) => {
    const { curriculumId, sectionId } = payload
    await axios.delete(`curricula/${curriculumId}/sections/${sectionId}`)
    removeSection(payload)
  }

  const postItem = async (payload) => {
    let { curriculumId, sectionId, type, body } = payload
    const res = await axios.post(`curricula/${curriculumId}/sections/${sectionId}/${type}`, body)

    // doing this because I need the object Id returned from Mongo
    payload.body = res.data
    upsertItem(payload)
  }

  const putItem = async (payload) => {
    const { curriculumId, sectionId, itemId, type, body } = payload
    await axios.patch(`curricula/${curriculumId}/sections/${sectionId}/${type}/${itemId}`, body)
    upsertItem(payload)
  }

  const patchItem = async (payload) => {
    const { curriculum, type, sectionId, item } = payload
    await axios.patch(`curricula/${curriculum._id}/sections/${sectionId}/${type}/${item._id}`, item)
    upsertItem(curriculum)
  }

  const deleteItem = async (payload) => {
    const { curriculumId, type, sectionId, itemId } = payload
    await axios.delete(`curricula/${curriculumId}/sections/${sectionId}/${type}/${itemId}`)
    removeItem(payload)
  }

  const countAllCompleted = async () => {
    const res = await axios.get(`count`)
    state.value.completeCounts = res.data || []
  }

  const removeCurriculum = (curriculumId) => {
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    state.value.curricula.splice(cIndex, 1)
  }

  const updateSection = (payload) => {
    const { curriculumId, body } = payload
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    const len = state.value.curricula[cIndex].sections.length
    state.value.curricula[cIndex].sections.splice(len, 0, body)
  }

  const removeSection = (payload) => {
    const { curriculumId, sectionId } = payload
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.value.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)
    state.value.curricula[cIndex].sections.splice(sIndex, 1)
  }

  const upsertItem = (payload) => {
    const { curriculumId, sectionId, type, body } = payload
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.value.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)

    if (payload.itemId !== undefined) {
      const iIndex = state.value.curricula[cIndex].sections[sIndex][type].findIndex((obj) => obj._id === payload.itemId)

      const { name, url, isCompleted } = body

      let updatedItem = {}
      if (name) updatedItem.name = name
      if (url) updatedItem.url = url
      if (isCompleted) updatedItem.isCompleted = isCompleted

      let item = {
        ...state.value.curricula[cIndex].sections[sIndex][type][iIndex],
        ...updatedItem
      }
      state.value.curricula[cIndex].sections[sIndex][type].splice(iIndex, 1, item)
    } else {
      state.value.curricula[cIndex].sections[sIndex][type].push(body)
    }
  }

  const removeItem = (payload) => {
    const { curriculumId, sectionId, type } = payload
    const cIndex = state.value.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.value.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)
    const iIndex = state.value.curricula[cIndex].sections[sIndex][type].findIndex((obj) => obj._id === payload.itemId)
    state.value.curricula[cIndex].sections[sIndex][type].splice(iIndex, 1)
  }

  const updateCount = (payload) => {
    state.value.completeCounts = payload || []
  }

  return {
    state,
    getCurriculum,
    getCurricula,
    postCurriculum,
    patchCurriculum,
    deleteCurriculum,
    postSection,
    patchSection,
    deleteSection,
    postItem,
    putItem,
    patchItem,
    deleteItem,
    countAllCompleted,
    removeCurriculum,
    updateSection,
    removeSection,
    upsertItem,
    removeItem,
    updateCount,
  }
})
