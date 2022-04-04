// export const PATH_NAME = 'account'

export function generate() {
  return this.$api.get(`/api/v1/generate`)
  // return this.$api.$get(`/api/v1/${PATH_NAME}/generate`)
}
