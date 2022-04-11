import config from '@/config'
import Web3 from '@/utils/web3'
import {abbrAddress} from '@/utils/common'
import {roundOffDecimals} from '@/utils/math'
import KolaWalletAPI from '@/api/KolaWalletAPI'
import {createStore} from 'vuex'

const EXCHANGE_DATA = {
  USD: 0,
  ERU: 0,
  JPY: 0,
  CNY: 0,
  WON: 0,
}

export default createStore({
  state: {
    web3: null,
    address: null,
    seedPhrase: null,
    privateKey: null,
    balance: 0,
    exchangeData: EXCHANGE_DATA,
    txList: [],
    selectedHost: 'ropsten',
    selectedExchange: 'USD',
  },
  getters: {
    web3: state => state.web3,
    address: state => state.address,
    abbrAddress: state => abbrAddress(state.address),
    seedPhrase: state => state.seedPhrase,
    privateKey: state => state.privateKey,
    balance: state => roundOffDecimals(state.balance, 4),
    pureBalance: state => state.balance,
    exchangeBalance: state => {
      const currentExchange = state.exchangeData[state.selectedExchange]
      const exchangeBalance = currentExchange * parseFloat(state.balance)
      return roundOffDecimals(exchangeBalance, 2)
    },
    exchangeData: state => state.exchangeData,
    txList: state => state.txList,
    host: state => config.hosts[state.selectedHost],
    hosts: () => config.hosts,
    selectedHost: state => state.selectedHost,
    selectedExchange: state => state.selectedExchange,
    isLogged: state => !!state.address,
  },
  mutations: {
    SET_WEB3: (state, web3 = null) => state.web3 = web3,
    SET_ADDRESS: (state, address = null) => state.address = address,
    SET_SEED_PHRASE: (state, seedPhrase = null) => state.seedPhrase = seedPhrase,
    SET_PRIVATE_KEY: (state, privateKey = null) => state.privateKey = privateKey,
    SET_BALANCE: (state, balance = 0) => state.balance = balance,
    SET_EXCHANGE_DATA: (state, exchangeData = EXCHANGE_DATA) => state.exchangeData = exchangeData,
    SET_TX_LIST: (state, txList = []) => state.txList = txList,
  },
  actions: {
    async loadApplication({dispatch}) {
      await dispatch('updateExchangeData')
    },
    async connectWallet({dispatch, commit, getters}) {
      const web3 = await Web3(getters.selectedHost, getters.privateKey)
      commit('SET_WEB3', web3)
      const address = await web3.eth.accounts.wallet[0]?.address
      commit('SET_ADDRESS', address)
      await dispatch('updateBalance')
      await dispatch('updateTxList')
    },
    async updateBalance({commit, getters}, unit = 'ether') {
      const currentBalance = await getters.web3.eth.getBalance(getters.address)
      const balance = getters.web3.utils.fromWei(currentBalance, unit)
      commit('SET_BALANCE', balance)
    },
    async updateExchangeData({commit, getters}, from = 'ETH') {
      const data = await KolaWalletAPI.exchange({from, to: getters.selectedExchange})
      commit('SET_EXCHANGE_DATA', data)
    },
    async updateTxList({commit, getters}) {
      const data = await KolaWalletAPI.getTransaction({
        address: getters.address,
        selectedHost: getters.selectedHost,
      })
      if (Array.isArray(data)) commit('SET_TX_LIST', data)
    },
  },
})
