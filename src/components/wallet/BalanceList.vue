<template>
  <div class='content'>
    <div class='item main'>
      <div class='backdrop'/>
      <div class='icon'/>
      <div class='info'>
        <div class='balance'>
          {{ balance }} ETH
        </div>
        <div class='exchange-balance'>
          ${{ exchangeBalance }} {{ selectedExchange }}
        </div>
      </div>
    </div>
    <div class='divider'/>
    <div
      class='send'
      @click='onClickSend'
    >
      <i class='bx bxs-right-top-arrow-circle'/>
      <span>보내기</span>
    </div>
    <div class='divider'/>
    <div class='item'>
      <div class='backdrop'/>
      <div class='icon'/>
      <div class='info'>
        <div class='balance'>
          10,000 KOLA
        </div>
        <div class='exchange-balance'>
          $165 USD
        </div>
      </div>
    </div>
    <div class='add-balance'>
      <i class='bx bx-plus'/>
      <span>새로운 자산 추가하기</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 40px);
  padding: 20px;
  z-index: 1;

  > .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    position: relative;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, .5);
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &.main > .backdrop {
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: url(/public/ethereum.png);
      background-repeat: no-repeat;
      background-position: right center;
      background-size: 35%;
    }

    > .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin: 0 20px;
      border: 1px solid #fff;
      border-radius: 500rem;
      background-color: rgba(255, 255, 255, .6);
      background-image: url(/public/ethereum.png);
      background-size: 60%;
      background-position: center;
      background-repeat: no-repeat;
    }

    > .info {
      > .balance {
        color: #333;
        font-size: 26px;
        font-weight: bold;
      }

      > .exchange-balance {
        margin-bottom: 5px;
        color: #CC4E8E;
        font-size: 14px;
      }
    }
  }

  > .divider {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #ffffff33;
  }

  > .send,
  > .add-balance {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 36px;
    margin-bottom: 20px;
    border-radius: 10px;
    background: #CC4E8E;
    color: #fff;
    font-size: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .25);
    cursor: pointer;

    > i {
      margin-right: 5px;
      font-size: 24px;
    }

    > span {
      margin-bottom: 4px;
    }
  }

  > .add-balance {
    width: 220px;
  }
}
</style>

<script>
import {mapActions, mapGetters} from 'vuex'

const TIMEOUT_SECONDS = 60

export default {
  name: 'BalanceList',
  data: () => ({
    timer: null,
  }),
  async mounted() {
    await this.autoUpdateCurrentBalance()
  },
  computed: {
    ...mapGetters(['balance', 'exchangeBalance', 'selectedExchange', 'isLogged']),
  },
  methods: {
    ...mapActions(['updateBalance']),
    onClickSend() {
      this.emitter.emit('onWalletPagePush', 3)
    },
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
