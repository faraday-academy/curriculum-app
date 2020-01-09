import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import actions from './actions'
import state from './state'
import mutations from './mutations'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters: {},
  plugins: [vuexLocal.plugin]
})
