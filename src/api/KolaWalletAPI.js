import {generate} from '@/api/v1/account'
import {exchange} from '@/api/v1/cryptocompare'
import {getTransaction} from '@/api/v1/etherscan'

class KolaWalletAPI {
  $api

  async generate(args) {
    const {data} = await generate.apply(this, [args])
    return data
  }

  async exchange(args) {
    const {data} = await exchange.apply(this, [args])
    return data
  }

  async getTransaction(args) {
    const {data: {result: data}} = await getTransaction.apply(this, [args])
    return data
  }
}

export default new KolaWalletAPI()
