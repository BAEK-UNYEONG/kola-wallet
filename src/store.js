import Web3 from '@/utils/web3'
import {roundOffDecimals} from '@/utils/math'
import KolaWalletAPI from '@/api/KolaWalletAPI'
import {createStore} from 'vuex'

import config from '@/config'


export default createStore({
  state: {
    web3: null,
    address: null, // '0x2640dc4eac3e7ee1cd5d2542b17b182c7b1a1c58',
    mnemonic: null,
    privateKey: null, // '924575c91ea36bc4c6bdce37e4e054d07b21f24d0757cda62c394d450c7e1e90',
    balance: 0,
    exchangeBalance: 0,
    selectedHost: 'ropsten'
  },
  actions: {
    async loadApplication() {

    },
    async connectWallet({dispatch, commit, getters}) {
      const web3 = await Web3(getters.selectedHost, getters.privateKey)
      commit('SET_WEB3', web3)
      console.log(web3.eth.accounts.wallet)
      const address = await web3.eth.accounts.wallet[0]?.address
      commit('SET_ADDRESS', address)
      await dispatch('updateBalance')
      // const {host} = getters
    },
    async updateBalance({commit, getters}, unit = 'ether') {
      const currentUSD = await KolaWalletAPI.changeToUSD()
      const currentBalance = await getters.web3.eth.getBalance(getters.address)
      const balance = getters.web3.utils.fromWei(currentBalance, unit)
      const exchangeBalance = currentUSD * parseFloat(balance)
      console.log(getters.address, "address")
      console.log(getters.privateKey, "privateKey")
      // console.log(balance, "balance")
      // console.log(exchangeBalance, "exchangeBalance")
      commit('SET_BALANCE', roundOffDecimals(balance, 4))
      commit('SET_EXCHANGE_BALANCE', roundOffDecimals(exchangeBalance, 2))
    },
  },
  mutations: {
    SET_WEB3: (state, web3 = null) => state.web3 = web3,
    SET_ADDRESS: (state, address = null) => state.address = address,
    SET_MNEMONIC: (state, mnemonic = null) => state.mnemonic = mnemonic,
    SET_PRIVATE_KEY: (state, privateKey = null) => state.privateKey = privateKey,
    SET_BALANCE: (state, balance = 0) => state.balance = balance,
    SET_EXCHANGE_BALANCE: (state, exchangeBalance = 0) => state.exchangeBalance = exchangeBalance,
  },
  getters: {
    web3: state => state.web3,
    address: state => state.address,
    mnemonic: state => state.mnemonic,
    privateKey: state => state.privateKey,
    balance: state => state.balance,
    exchangeBalance: state => state.exchangeBalance,
    host: state => config.hosts[state.selectedHost],
    selectedHost: state => state.selectedHost,
    isLogged: state => !!state.address,
  },
})
