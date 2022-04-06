import Web3 from 'web3'

const {VUE_APP_INFURA_PROJECT_ID} = process.env

export default async (network, privateKey) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${VUE_APP_INFURA_PROJECT_ID}`
    )
  )
  const signer = web3.eth.accounts.privateKeyToAccount(privateKey)
  web3.eth.accounts.wallet.add(signer)
  return web3
}
