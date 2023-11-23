import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable)

app.mount('#app')
