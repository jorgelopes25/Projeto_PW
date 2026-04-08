import { createRouter, createWebHistory } from 'vue-router'

// Importar os Layouts
import FrontLayout from '../layouts/FrontLayout.vue'
import BackLayout from '../layouts/BackLayout.vue'
import PwaLayout from '../layouts/PwaLayout.vue'

// (Aviso: Vais precisar de criar estes ficheiros Vue vazios na pasta views/ depois!)
import Home from '../views/FrontOffice/Home.vue'
import Dashboard from '../views/BackOffice/Dashboard.vue'
import ListaEntregas from '../views/PWA/ListaEntregas.vue'
import LeitorQR from '../views/PWA/LerQr.vue'
import Login from '../views/PWA/Login.vue'

const routes = [
  {
    // Tudo o que começa por "/" usa o FrontLayout
    path: '/',
    component: FrontLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      // Podes adicionar o /checkout aqui no futuro
    ]
  },
  {
    // Tudo o que começa por "/backoffice" usa o BackLayout
    path: '/backoffice',
    component: BackLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      // Podes adicionar o /pedidos aqui no futuro
    ]
  },
  {
    // Tudo o que começa por "/estafeta" usa o PwaLayout
    path: '/estafeta',
    component: PwaLayout,
    children: [
      { path: '', name: 'ListaEntregas', component: ListaEntregas },
      { path: 'ler-qr', name: 'LeitorQR', component: LeitorQR },
      { path: 'login', name: 'Login', component: Login },
      // Podes colocar aqui a página com o leitor QR e a assinatura
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router