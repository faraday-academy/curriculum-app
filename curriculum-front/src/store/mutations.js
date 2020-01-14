export default {
  updateCurricula(state, curricula) {
    state.curricula = curricula
  },
  appendCurriculum(state, curriculum) {
    state.curricula.push(curriculum)
  },
  updateSnackbar(state, settings) {
    state.snackbar = {
      ...state.snackbar,
      ...settings
    }
  }
}
