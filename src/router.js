import {createRouter, createWebHistory} from 'vue-router'
import Main from '@/views/Main'
import CreateAccount from '@/views/CreateAccount'
import ImportWallet from '@/views/ImportWallet'
import WalletMain from '@/views/WalletMain'

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
  {
    path: '/wallet-main',
    name: 'WalletMain',
    component: WalletMain
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
