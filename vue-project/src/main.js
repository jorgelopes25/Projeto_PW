// 1. IMPORTAR O BOOTSTRAP (Isto é o que vai dar o design ao site!)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/custom.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// (Se tinhas aqui um import './assets/main.css', nós apagámos para não estragar o design)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)

app.use(router)
app.mount('#app')

registerSW({ immediate: true })