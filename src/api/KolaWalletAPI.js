import {generate} from './v1/account'

class KolaWalletAPI {
  $api

  async generate() {
    const {data} = await generate.apply(this)
    return data
  }
}

export default new KolaWalletAPI()
