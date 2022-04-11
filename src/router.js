import {createRouter, createWebHistory} from 'vue-router'
import Index from '@/views/Index'
import CreateAccount from '@/views/CreateAccount'
import ImportWallet from '@/views/ImportWallet'
import WalletIndex from '@/views/wallet/Index'

const routes = [
  {
    path: '/',
    alias: ['/', '/app', '/index.html'],
    name: 'Index',
    component: Index
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
    path: '/wallet',
    name: 'WalletIndex',
    component: WalletIndex,
    children: [
      {
        path: 'index',
        name: 'WalletIndex',
        component: WalletIndex,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
