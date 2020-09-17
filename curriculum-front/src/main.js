import Vue from 'vue'
import Vuelidate from 'vuelidate'
import InfiniteLoading from 'vue-infinite-loading'
import RotateLoader from 'vue-spinner/src/RotateLoader.vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import './sass/index.sass'

Vue.use(Vuelidate)
Vue.use(InfiniteLoading, { /* options */ })

Vue.component('rotate-loader', RotateLoader)

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
