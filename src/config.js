const config = {}

config.hosts = {
  main: {
    explorerUri: 'https://etherscan.io',
    chainId: 1,
    test: false,
  },
  ropsten: {
    explorerUri: 'https://ropsten.etherscan.io',
    chainId: 3,
    test: true,
  },
  kovan: {
    explorerUri: 'https://kovan.etherscan.io',
    chainId: 42,
    test: true,
  },
  rinkeby: {
    explorerUri: 'https://rinkeby.etherscan.io',
    chainId: 4,
    test: true,
  }
}

module.exports = exports = config
