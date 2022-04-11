import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import easySpinner from 'vue-easy-spinner'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'
import './sass/index.sass'

const vuetify = createVuetify()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(easySpinner, { prefix: 'easy' })

app.mount('#app')
