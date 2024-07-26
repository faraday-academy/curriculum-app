import { defineStore } from 'pinia'
import axios from './axiosConfig'
import router from '../router'
import { reactive } from 'vue'

export const useCurriculumStore = defineStore('curriculum', () => {
  const state = reactive({
    curricula: [],
    curriculaMeta: {},
    snackbar: {
      show: false,
      variant: 'success',
      message: ''
    },
    completeCounts: [],
    selectedCurriculum: {},
    loading: false
  })

  const getCurriculum = async (id) => {
    const { data } = await axios.get(`curricula/${id}`)
    console.log(data)
    const curr = { ...data.curriculum, createdByName: data.createdByName }
    console.log(curr)
    state.selectedCurriculum = curr
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
    state.curriculaMeta = meta
    if (currentPage === 1) {
      state.curricula = res.data.docs
    } else {
      state.curricula.push(...res.data.docs)
    }
  }

  const postCurriculum = async (curriculum) => {
    const res = await axios.post('curricula', curriculum)
    state.curricula.push(res.data)
    router.push(`/curricula/${res.data._id}`)
  }

  const patchCurriculum = async (payload) => {
    const { curriculumId, body } = payload
    await axios.patch(`curricula/${curriculumId}`, body)
    // commit('updateCurriculum', payload)
  }

  const deleteCurriculum = async (curriculumId) => {
    await axios.delete(`curricula/${curriculumId}`)
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    state.curricula.splice(cIndex, 1)
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
    state.completeCounts = res.data || []
  }

  const updateSelectedCurriculum = (curriculum) => {
    state.selectedCurriculum = curriculum
  }

  const setCurriculaMeta = (metaData) => {
    state.curriculaMeta = metaData
  }

  const setCurricula = (curricula) => {
    state.curricula = curricula
  }

  const updateCurricula = (curricula) => {
    state.curricula.push(...curricula)
  }

  const appendCurriculum = (curriculum) => {
    state.curricula.push(curriculum)
  }

  const removeCurriculum = (curriculumId) => {
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    state.curricula.splice(cIndex, 1)
  }

  const updateSection = (payload) => {
    const { curriculumId, body } = payload
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    const len = state.curricula[cIndex].sections.length
    state.curricula[cIndex].sections.splice(len, 0, body)
  }

  const removeSection = (payload) => {
    const { curriculumId, sectionId } = payload
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)
    state.curricula[cIndex].sections.splice(sIndex, 1)
  }

  const upsertItem = (payload) => {
    const { curriculumId, sectionId, type, body } = payload
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)

    if (payload.itemId !== undefined) {
      const iIndex = state.curricula[cIndex].sections[sIndex][type].findIndex((obj) => obj._id === payload.itemId)

      const { name, url, isCompleted } = body

      let updatedItem = {}
      if (name) updatedItem.name = name
      if (url) updatedItem.url = url
      if (isCompleted) updatedItem.isCompleted = isCompleted

      let item = {
        ...state.curricula[cIndex].sections[sIndex][type][iIndex],
        ...updatedItem
      }
      state.curricula[cIndex].sections[sIndex][type].splice(iIndex, 1, item)
    } else {
      state.curricula[cIndex].sections[sIndex][type].push(body)
    }
  }

  const removeItem = (payload) => {
    const { curriculumId, sectionId, type, body } = payload
    const cIndex = state.curricula.findIndex((obj) => obj._id === curriculumId)
    const sIndex = state.curricula[cIndex].sections.findIndex((obj) => obj._id === sectionId)
    const iIndex = state.curricula[cIndex].sections[sIndex][type].findIndex((obj) => obj._id === payload.itemId)
    state.curricula[cIndex].sections[sIndex][type].splice(iIndex, 1)
  }

  const updateSnackbar = (settings) => {
    state.snackbar = {
      ...state.snackbar,
      ...settings
    }
  }

  const updateLoadingStatus = (isLoading) => {
    state.loading = isLoading
  }

  const updateCount = (payload) => {
    state.completeCounts = payload || []
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
    updateSelectedCurriculum,
    setCurriculaMeta,
    setCurricula,
    updateCurricula,
    appendCurriculum,
    removeCurriculum,
    updateSection,
    removeSection,
    upsertItem,
    removeItem,
    updateSnackbar,
    updateLoadingStatus,
    updateCount
  }
})
