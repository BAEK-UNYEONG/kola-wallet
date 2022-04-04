// export const PATH_NAME = 'account'
const { VITE_DOMAIN } = import.meta.env

export function generate() {
  return this.$api.get(`${VITE_DOMAIN}/api/v1/generate`)
  // return this.$api.$get(`/api/v1/${PATH_NAME}/generate`)
}
