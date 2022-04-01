import {createRouter, createWebHistory} from 'vue-router'

import Main from "./views/Main.vue"
import CreateAccount from "./views/CreateAccount.vue"

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
