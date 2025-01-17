// import './assets/main.css'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AppComponent from './App.vue'
import router from './router'

const app = createApp(AppComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')
