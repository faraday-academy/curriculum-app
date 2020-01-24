import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
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
