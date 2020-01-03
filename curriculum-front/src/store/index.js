import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters: {}
})
