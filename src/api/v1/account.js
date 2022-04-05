import qs from 'qs'

// export const PATH_NAME = 'account'
const {VUE_DOMAIN} = process.env

export function generate(args) {
  return this.$api.get(`${VUE_DOMAIN}/api/v1/generate`, {
      params: {
        password: args.password,
        mnemonic: args.mnemonic,
      },
      paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'})
    }
  )
  // return this.$api.$get(`/api/v1/${PATH_NAME}/generate`)
}
