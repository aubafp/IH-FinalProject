import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

// Pinia & Pinia persist

const pinia = createPinia()
pinia.use(piniaPersist)


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// Create app

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
