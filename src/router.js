import {createRouter, createWebHistory} from 'vue-router'

import Main from './views/Main.vue'
import CreateAccount from './views/CreateAccount.vue'
import ImportWallet from './views/ImportWallet.vue'

const routes = [
  {
    path: '/',
    alias: ['/', '/app', '/index.html'],
    name: 'Main',
    component: Main
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/import-wallet',
    name: 'ImportWallet',
    component: ImportWallet
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
