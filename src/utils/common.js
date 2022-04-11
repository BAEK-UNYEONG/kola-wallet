export function abbrAddress(address) {
  const first = address?.slice(0, 6)
  const last = address?.slice(-4)
  return `${first}...${last}`
}
