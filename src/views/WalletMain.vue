<template>
  <div class='container'>
    <Header/>
    <div class='content'>
      <div class='item main'>
        <div class='backdrop'/>
        <div class='balance'>
          {{ balance }} ETH
        </div>
        <div class='exchange-balance'>
          ${{ exchangeBalance }} {{ selectedExchange }}
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style lang='scss' scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 600px;
  background: #6E777C;

  > .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 20px;

    > .item {
      display: flex;
      height: 100px;
      position: relative;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, .1);
      box-shadow: 0 0 30px rgba(0, 0, 0, .1);
      overflow: hidden;
      cursor: pointer;

      > .backdrop {
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url(/public/kola.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        filter: blur(8px);
        opacity: .25;
      }
    }
  }
}
</style>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import CustomButton from '@/components/common/CustomButton'
import {mapActions, mapGetters} from 'vuex'

const TIMEOUT_SECONDS = 10

export default {
  name: 'WalletMain',
  components: {
    Header,
    Footer,
    CustomButton,
  },
  data: () => ({
    timer: null,
  }),
  async mounted() {
    if (!this.isLogged) {
      await this.$router.push('/')
      return
    }
    await this.connectWallet()
    await this.autoUpdateCurrentBalance()
  },
  computed: {
    ...mapGetters(['balance', 'exchangeBalance', 'selectedExchange', 'isLogged']),
  },
  methods: {
    ...mapActions(['loadApplication', 'connectWallet', 'updateBalance']),
    async autoUpdateCurrentBalance() {
      setTimeout(async () => {
        await this.updateBalance()
        await this.autoUpdateCurrentBalance()
      }, TIMEOUT_SECONDS * 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
  }
}
</script>
