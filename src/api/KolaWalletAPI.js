import {generate} from '@/api/v1/account'
import {changeToUSD} from '@/api/v1/cryptocompare'

class KolaWalletAPI {
  $api

  async generate(args) {
    const {data} = await generate.apply(this, [args])
    return data
  }

  async changeToUSD() {
    const {
      data: {
        USD: data,
      },
    } = await changeToUSD.apply(this)
    return data
  }
}

export default new KolaWalletAPI()
