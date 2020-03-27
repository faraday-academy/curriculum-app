export default {
  updateCurricula(state, curricula) {
    state.curricula = curricula
  },
  appendCurriculum(state, curriculum) {
    state.curricula.push(curriculum)
  },
  updateCurriculum(state, payload) {
    // payload: { id, body }
    // find and update one curriculum
  },
  upsertItem(state, payload) {
    const { curriculumId, sectionId, type, body } = payload
    const cIndex = state.curricula.findIndex((obj) => {
      return obj._id === curriculumId
    })
    const sIndex = state.curricula[cIndex].sections.findIndex((obj) => {
      return obj._id === sectionId
    })
    if (payload.itemId !== undefined) {
      const iIndex = state.curricula[cIndex].sections[sIndex][type].findIndex((obj) => {
        return obj._id === payload.itemId
      })

      const { name, url, isCompleted } = body

      let updatedItem = {}
      if (name) updatedItem.name = name
      if (url) updatedItem.url = url
      if (isCompleted) updatedItem.isCompleted = isCompleted

      // TODO: try adding vm.Set to fix the problem here
      // item is being updated in store but not in template

      let item = state.curricula[cIndex].sections[sIndex][type][iIndex]
      state.curricula[cIndex].sections[sIndex][type][iIndex] = {
        ...item,
        ...updatedItem
      }
    } else {
      state.curricula[cIndex].sections[sIndex][type].push(body)
    }
  },
  updateSnackbar(state, settings) {
    state.snackbar = {
      ...state.snackbar,
      ...settings
    }
  }
}
