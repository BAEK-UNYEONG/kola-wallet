import qs from 'qs'

export function getTransaction(args) {
  const ETHERSCAN_DOMAIN = `https://api-${args.selectedHost}.etherscan.io`
  return this.$api.get(`${ETHERSCAN_DOMAIN}/api`, {
    params: {
      module: 'account',
      action: 'txlist',
      address: args.address,
      page: 1,
      offset: 10,
      sort: 'desc',
      // apikey: ETHERSCAN_API_KEY,
    },
    paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'})
  })
}
