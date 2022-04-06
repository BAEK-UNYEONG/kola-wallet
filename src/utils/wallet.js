import LightWallet from 'eth-lightwallet'

const HD_PATH_STRING = 'm/44\'/60\'/0\'/0'

const generate = async (password, randomSeed) => await new Promise((resolve, reject) => {
  LightWallet.keystore.createVault({
    password,
    seedPhrase: randomSeed
      ? randomSeed
      : LightWallet.keystore.generateRandomSeed(),
    hdPathString: HD_PATH_STRING,
  }, (err, keystore) => {
    if (err) {
      reject(err)
    }
    resolve(keystore)
  })
})

const newAddress = async (keystore, password, randomSeed) => await new Promise((resolve, reject) => {
  keystore.keyFromPassword(password, (err, pwDerivedKey) => {
    if (err) {
      reject(err)
    }
    keystore.generateNewAddress(pwDerivedKey, 1)
    const address = keystore.getAddresses()[0]
    const seedPhrase = randomSeed
      ? randomSeed
      : keystore.getSeed(pwDerivedKey)
    const privateKey = keystore.exportPrivateKey(address, pwDerivedKey)
    const keystoreJsonDataLink = encodeURI(`data:application/json;charset=utf-8,${keystore.serialize()}`)
    resolve({
      address,
      seedPhrase,
      privateKey,
      keystoreJsonDataLink,
    })
  })
})

export function isSeedValid(randomSeed) {
  if (!randomSeed) {
    return false
  }
  if (randomSeed.split(' ').length !== 12) {
    return false
  }
  return LightWallet.keystore.isSeedValid(randomSeed)
}

export async function generateAccount({password, randomSeed = null}) {
  const keystore = await generate(password, randomSeed)
  const {
    address,
    seedPhrase,
    privateKey,
    keystoreJsonDataLink,
    fileName,
  } = await newAddress(keystore, password, randomSeed)
  return {
    address,
    seedPhrase,
    privateKey,
    keystoreJsonDataLink,
    fileName,
  }
}
