<template>
  <component :is='viewComponent'/>
</template>

<script>
import BalanceList from '@/components/wallet/BalanceList'
import TransactionList from '@/components/wallet/TransactionList'
import SendContact from '@/components/wallet/send/SendContact'
import SendTransaction from '@/components/wallet/send/SendTransaction'
import SendTransactionDetail from '@/components/wallet/send/SendTransactionDetail'

const components = [
  BalanceList,
  TransactionList,
  SendContact,
  SendTransaction,
  SendTransactionDetail,
]

export default {
  name: 'MainContent',
  props: {
    index: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    beforeIndex: 1,
    currentIndex: 1,
  }),
  watch: {
    index(index) {
      this.beforeIndex = this.currentIndex
      this.currentIndex = index
    },
  },
  async mounted() {
    this.beforeIndex = this.index
    this.currentIndex = this.index
    this.emitter.on(
      'onWalletPagePush',
      index => {
        this.beforeIndex = this.currentIndex
        this.currentIndex = index
      }
    )
    this.emitter.on(
      'onWalletPagePop',
      () => this.currentIndex = this.beforeIndex
    )
  },
  async beforeUnmount() {
    this.emitter.off('onWalletPagePush')
    this.emitter.off('onWalletPagePop')
  },
  computed: {
    viewComponent() {
      return components[this.currentIndex - 1]
    },
  },
}
</script>
