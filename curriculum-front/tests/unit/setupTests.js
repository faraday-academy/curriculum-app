import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify)
Vue.config.productionTip = false

let localVue = createLocalVue()
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FAA275', // orange
        secondary: '#F5E4C3', // tan
        accent: '#710627', // maroon
        error: '#EA5455',
        info: '#34A7B2',
        success: '#4CAF50', // default vuetify green
        warning: '#EA5455'
      }
    }
  }
})

localVue.use(vuetify)

export default {
  localVue,
  vuetify
}
