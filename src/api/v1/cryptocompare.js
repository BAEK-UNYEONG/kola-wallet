export function changeToUSD() {
  return this.$api.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
}
