// Imports

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

// Pinia & Pinia persist

const pinia = createPinia()
pinia.use(piniaPersist)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Create app

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
