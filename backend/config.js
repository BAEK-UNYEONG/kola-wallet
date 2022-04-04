const config = {}

config.hosts = {
  main: {
    test: false,
    rpcUri: 'https://mainnet.infura.io/v3/198cfc1e12294cc4ba3ab6cf17bfc30d',
    explorerUri: 'https://etherscan.io',
    chainId: 1
  },
  ropsten: {
    test: true,
    rpcUri: 'https://ropsten.infura.io/v3/198cfc1e12294cc4ba3ab6cf17bfc30d',
    explorerUri: 'https://ropsten.etherscan.io',
    chainId: 3
  },
  kovan: {
    test: true,
    rpcUri: 'https://kovan.infura.io/v3/198cfc1e12294cc4ba3ab6cf17bfc30d',
    explorerUri: 'https://kovan.etherscan.io',
    chainId: 42
  },
  rinkeby: {
    test: true,
    rpcUri: 'https://rinkeby.infura.io/v3/198cfc1e12294cc4ba3ab6cf17bfc30d',
    explorerUri: 'https://rinkeby.etherscan.io',
    chainId: 4
  }
}

module.exports = exports = config
