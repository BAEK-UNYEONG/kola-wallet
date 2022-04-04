import {createStore} from 'vuex'

export default createStore({
  state: {
    address: null,
    mnemonic: null,
  },
  actions: {
    async loadApplication() {

    },
    async isLogged({getters}) {
      return !!getters.address
    },
  },
  mutations: {
    SET_ADDRESS: (state, address = null) => state.address = address,
    SET_MNEMONIC: (state, mnemonic = null) => state.mnemonic = mnemonic,
  },
  getters: {
    address: state => state.address,
    mnemonic: state => state.mnemonic,
  },
})
