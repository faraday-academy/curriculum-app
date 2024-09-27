import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './sass/index.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(vuetify)

app.mount('#app')
