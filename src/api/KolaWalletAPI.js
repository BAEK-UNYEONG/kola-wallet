import {generate} from './v1/account'

class KolaWalletAPI {
  $api

  async generate(args) {
    const {data} = await generate.apply(this, [args])
    return data
  }
}

export default new KolaWalletAPI()
