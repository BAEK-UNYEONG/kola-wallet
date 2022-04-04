import KoaRouter from '@koa/router'
import Wallet from 'yoethwallet'

const api = new KoaRouter()

const HD_PATH_STRING = 'm/44\'/60\'/0\'/0'

const generate = async (mnemonic = '') => await new Promise((resolve, reject) => {
  Wallet.wallet.generate(mnemonic, HD_PATH_STRING, (err, keystore) => {
    if (err) {
      reject({code: 500, message: err})
      return
    }
    resolve(keystore)
  })
})

const newAddress = async (keystore, password = '') => await new Promise((resolve, reject) => {
  const privateKey = keystore.getHexPrivateKey()
  const address = keystore.getHexAddress(true)
  let keystoreJsonDataLink, fileName
  keystore.toV3String(password, {}, (err, v3Json) => {
    if (err) {
      reject({code: 500, message: err})
      return
    }
    keystoreJsonDataLink = encodeURI('data:application/json;charset=utf-8,' + v3Json)
    fileName = `${keystore.getV3Filename()}.json`
    resolve({
      address,
      privateKey,
      keystoreJsonDataLink,
      fileName,
    })
  })
})

api.get('/generate', async (ctx, next) => {
  const {mnemonic, password} = ctx.query
  let address, pureMnemonic, privateKey, keystore, keystoreJsonDataLink, fileName
  try {
    keystore = await generate(mnemonic)
    pureMnemonic = keystore.mnemonic
    const result = await newAddress(keystore, password)
    address = result.address
    privateKey = result.privateKey
    keystoreJsonDataLink = result.keystoreJsonDataLink
    fileName = result.fileName
  } catch (error) {
    ctx.throw(error.code, error.message)
  }
  ctx.status = 200
  ctx.body = {
    data: {
      address,
      pureMnemonic,
      privateKey,
      keystoreJsonDataLink,
      fileName,
    },
  }
})

export default api
