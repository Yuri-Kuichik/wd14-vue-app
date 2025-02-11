// import './assets/main.css'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import AppComponent from './App.vue'
import router from './router'

import SharedButton from './components/SharedButton.vue'
import BaseInput from './components/BaseInput.vue'
import BaseLayout from './components/BaseLayout.vue'
import VueSpinner from './components/VueSpinner.vue'

const app = createApp(AppComponent)
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.component('MySharedButton', SharedButton)
app.component('BaseInput', BaseInput)
app.component('BaseLayout', BaseLayout)
app.component('VueSpinner', VueSpinner)

app.use(pinia)
app.use(router)

app.mount('#app')
