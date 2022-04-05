import Web3 from './utils/web3'
import {createStore} from 'vuex'

const {ethereum} = window

export default createStore({
  state: {
    web3: null,
    address: null,
    mnemonic: null,
    balance: 0,
  },
  actions: {
    async loadApplication() {

    },
    async connectWallet({dispatch, commit}) {
      const web3 = await Web3()
      // const accounts = await web3.eth.getAccounts()
      const balance = await dispatch('getBalance')

      // console.log(accounts)
      console.log(balance)

      commit('SET_WEB3', web3)
      // commit('SET_ACCOUNT', accounts[0])
      commit('SET_BALANCE', balance)
    },
    async getBalance({getters}, unit = 'ether') {
      const web3 = await Web3()
      const balance = await web3.eth.getBalance(getters.address)
      return web3.utils.fromWei(balance, unit)
    },
    async isLogged({getters}) {
      return !!getters.address
    },
  },
  mutations: {
    SET_ADDRESS: (state, address = null) => state.address = address,
    SET_MNEMONIC: (state, mnemonic = null) => state.mnemonic = mnemonic,
    SET_BALANCE: (state, balance = 0) => state.balance = balance,
  },
  getters: {
    address: state => state.address,
    mnemonic: state => state.mnemonic,
    balance: state => state.balance,
  },
})
