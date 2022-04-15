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
    <div class='tx-list'>
      <div
        v-for='(item, index) in txList' :key='index'
        class='item'
      >
        <div class='backdrop'/>
        <div class='icon'>
          <i :class='[
            "bx",
            isReceived(item.to)
              ? "bxs-down-arrow-circle"
              : "bxs-right-top-arrow-circle",
          ]'/>
        </div>
        <div class='author-info'>
          <div class='label'>
            {{ authorLabel(item.to) }}
          </div>
          <div class='datetime-address'>
            <span>{{ dateLabel(item.timestamp) }} ·</span>
            {{ transceiverLabel(item.to) }}: {{ transceiverAddress(item.from, item.to) }}
          </div>
        </div>
        <div class='balance-info'>
          <div class='balance'>
            {{ filteredBalance(item.to, item.value) }}
          </div>
          <div class='exchange-balance'>
            {{ filteredPureBalance(item.to, item.value) }}
          </div>
        </div>
      </div>
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

  > .send {
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

  > .tx-list {
    width: 340px;
    height: 240px;
    position: absolute;
    top: 299px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    > .item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      position: relative;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, .5);
      box-shadow: 0 0 20px rgba(0, 0, 0, .1);
      overflow: hidden;
      cursor: pointer;

      &:hover {
        opacity: .8;
      }

      &:last-child {
        margin-bottom: 20px;
      }

      > .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        margin: 0 5px 0 10px;
        color: #CC4E8E;
        font-size: 36px;
      }

      > .author-info,
      > .balance-info {
        > .label {
          font-size: 16px;
        }

        > .datetime-address {
          margin-top: 2px;
          color: #6E777C;
          font-size: 13px;

          > span {
            color: #CC4E8E;
          }
        }

        > .balance {
          color: #333;
          font-size: 16px;
        }

        > .exchange-balance {
          color: #6E777C;
          font-size: 14px;
        }
      }

      > .balance-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 10px;
      }
    }
  }
}
</style>

<script>
import dayjs from 'dayjs'
import {abbrAddress} from '@/utils/common'
import {roundOffDecimals} from '@/utils/math'
import {mapActions, mapGetters} from 'vuex'

const TIMEOUT_SECONDS = 10

dayjs().format()

export default {
  name: 'TransactionList',
  data: () => ({
    timer: null,
  }),
  async mounted() {
    await this.autoUpdateTxList()
  },
  computed: {
    ...mapGetters(['web3', 'address', 'balance', 'exchangeBalance', 'selectedExchange', 'txList', 'isLogged']),
  },
  methods: {
    ...mapActions(['updateTxList']),
    onClickSend() {
      this.emitter.emit('onWalletPagePush', 3)
    },
    authorLabel(to) {
      return this.isReceived(to) ? '받기' : '보내기'
    },
    dateLabel(timestamp) {
      return dayjs(timestamp).format('MMM D')
    },
    transceiverLabel(to) {
      return this.isReceived(to) ? '발신' : '수신'
    },
    transceiverAddress(from, to) {
      return this.isReceived(to)
        ? abbrAddress(from)
        : abbrAddress(to)
    },
    filteredBalance(to, value) {
      const balance = this.filteredPureBalance(to, value)
      const digit = 11
      return balance.length > digit
        ? `${balance.substring(0, digit)}...`
        : balance
    },
    filteredPureBalance(to, value) {
      const balance = roundOffDecimals(this.web3.utils.fromWei(value, 'ether'), 8)
      const minusDivision = this.isReceived(to) ? '' : '-'
      return `${minusDivision}${balance} ETH`
    },
    isReceived(to) {
      return to.toLocaleString() === this.address.toLowerCase()
    },
    async autoUpdateTxList() {
      setTimeout(async () => {
        await this.updateTxList()
        await this.autoUpdateTxList()
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
