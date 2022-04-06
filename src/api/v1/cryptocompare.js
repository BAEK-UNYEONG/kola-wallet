export function exchange(args) {
  return this.$api.get(`https://min-api.cryptocompare.com/data/price?fsym=${args.from}&tsyms=${args.to}`)
}
