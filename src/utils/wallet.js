import Wallet from 'yoethwallet'

const HD_PATH_STRING = 'm/44\'/60\'/0\'/0'

const generate = async (mnemonic = '') => await new Promise((resolve, reject) => {
  Wallet.wallet.generate(mnemonic, HD_PATH_STRING, (err, keystore) => {
    if (err) {
      reject(err)
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
      reject(err)
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

export async function generateAccount({mnemonic, password}) {
  let address, pureMnemonic, privateKey, keystore, keystoreJsonDataLink, fileName
  keystore = await generate(mnemonic)
  pureMnemonic = keystore.mnemonic
  const result = await newAddress(keystore, password)
  address = result.address
  privateKey = result.privateKey
  keystoreJsonDataLink = result.keystoreJsonDataLink
  fileName = result.fileName
  return {
    address,
    mnemonic: pureMnemonic,
    privateKey,
    keystoreJsonDataLink,
    fileName,
  }
}
