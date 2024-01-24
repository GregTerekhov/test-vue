import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoUser, IoCloseOutline, CoHome } from 'oh-vue-icons/icons'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

addIcons(CoUser, IoCloseOutline, CoHome)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(router).use(pinia).mount('#app')
