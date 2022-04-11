export function roundOffDecimals(number, toFixed = 0) {
  const currentNumber = parseFloat(number)
  return currentNumber > 0
    ? currentNumber
      .toFixed(toFixed)
      .toLocaleString()
      .replace(/\.?0+$/, '')
    : 0
}
