import Vue from 'vue'
import Vuelidate from 'vuelidate'
import InfiniteLoading from 'vue-infinite-loading'
import { VueSpinners } from '@saeris/vue-spinners'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import './sass/index.sass'

Vue.use(Vuelidate)
Vue.use(InfiniteLoading, { /* options */ })
Vue.use(VueSpinners)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
