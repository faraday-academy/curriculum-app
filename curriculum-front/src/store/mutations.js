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
  updateSnackbar(state, settings) {
    state.snackbar = {
      ...state.snackbar,
      ...settings
    }
  }
}
