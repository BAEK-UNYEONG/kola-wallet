import Web3 from 'web3'

const {ethereum} = window

export default async () => {
  if (typeof ethereum === 'undefined') {
    return false;
  }
  await ethereum.enable()
  return new Web3(ethereum, null, {
    transactionConfirmationBlocks: 1,
  })
}
