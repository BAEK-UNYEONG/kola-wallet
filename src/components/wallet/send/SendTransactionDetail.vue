<template>
  <div class='content'>
    <div class='address-info-box'>
      <div class='from'>
        <div class='profile' v-html='gravatar(sendTxData.from)'/>
        <div class='address'>
          {{ abbrAddress(sendTxData.from) }}
        </div>
      </div>
      <div class='icon'>
        <i class='bx bx-right-arrow-alt'/>
      </div>
      <div class='to'>
        <div class='profile' v-html='gravatar(sendTxData.to)'/>
        <div class='address'>
          {{ abbrAddress(sendTxData.to) }}
        </div>
      </div>
    </div>
    <div class='send-info-box'>
      <div class='icon'/>
      <div class='value'>
        <div class='label'>
          ETH 보내기
        </div>
        {{ sendTxData.value }}
      </div>
    </div>
    <div class='divider'>
      <div class='edit'>
        편집
      </div>
    </div>
    <div class='send-cost-info-box'>
      <div class='label'>
        <div class='title'>
          예상 가스 요금
        </div>
        <div class='description highlight'>
          아마도
          <i class='bx bxs-chevron-left'/>
          30 초 후
        </div>
      </div>
      <div class='cost'>
        <div class='current-cost'>
          0.0000315
        </div>
        <div class='gas-cost'>
          0.000032 ETH
        </div>
        <div class='max-cost'>
          <span>
            최대 요금
          </span>
          0.0000315 ETH
        </div>
      </div>
    </div>
    <div class='send-cost-info-box last'>
      <div class='label'>
        <div class='title'>
          합계
        </div>
        <div class='description'>
          금액 + 가스 요금
        </div>
      </div>
      <div class='cost'>
        <div class='current-cost'>
          0.0000315
        </div>
        <div class='gas-cost'>
          0.000032 ETH
        </div>
        <div class='max-cost'>
          <span>
            최대 요금
          </span>
          0.0000315 ETH
        </div>
      </div>
    </div>
    <div class='divider'/>
    <div class='button-group'>
      <div
        class='button flat'
        @click='onClickCancel'
      >
        <span>거부</span>
      </div>
      <div
        class='button'
        @click='onClickSubmit'
      >
        <span>확인</span>
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

  > .address-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;

    > .from, > .to {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, .5);
      box-shadow: 0 0 20px rgba(0, 0, 0, .1);

      > .profile {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        border-radius: 500rem;
        background: #6E777C;
        overflow: hidden;
        cursor: pointer;
      }

      > .address {
        margin: 0 5px 2px 0;
        font-size: 14px;
      }
    }

    > .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      color: #1a1a1b;
      font-size: 24px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, .5);
      box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    }
  }

  > .send-info-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 60px;
    margin: 20px 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, .5);
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);

    > .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin: 0 10px;
      background-image: url(/public/ethereum.png);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    > .value {
      display: flex;
      margin: 0 0 2px;
      flex: 1;
      flex-direction: column;
      position: relative;
      color: #1a1a1b;
      font-size: 22px;

      > .label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5px 2px 6px;
        position: absolute;
        top: -25px;
        left: -35px;
        border-radius: 5px;
        background: rgba(0, 0, 0, .75);
        box-shadow: 0 0 20px rgba(0, 0, 0, .4);
        color: #999;
        font-size: 13px;
      }
    }
  }

  > .send-cost-info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 340px;
    margin-bottom: 10px;
    padding: 10px 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, .5);
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);

    &.last {
      margin-bottom: 20px;
    }

    > .label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;

      > .title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
      }

      > .description {
        color: #666;
        font-size: 12px;

        &.highlight {
          color: #CC4E8E;
        }

        > i {
          margin: 0 -2px;
        }
      }
    }

    > .cost {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      margin-right: 10px;

      > .current-cost {
        margin-bottom: 5px;
        color: #333;
        font-size: 14px;
      }

      > .gas-cost {
        color: #1a1a1b;
        font-size: 14px;
        font-weight: bold;
      }

      > .max-cost {
        color: #666;
        font-size: 13px;
      }
    }
  }

  > .divider {
    position: relative;
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #ffffff33;

    > .edit {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -10px;
      right: -10px;
      width: 40px;
      height: 20px;
      margin-bottom: 20px;
      padding-bottom: 2px;
      color: #CC4E8E;
      font-size: 13px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, .5);
      cursor: pointer;

      &:active {
        background-color: rgba(0, 0, 0, .25);
      }
    }
  }

  > .button-group {
    display: flex;

    > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 36px;
      margin: 0 10px 0 10px;
      border-radius: 10px;
      background: #CC4E8E;
      color: #fff;
      font-size: 16px;
      box-shadow: 0 0 20px rgba(0, 0, 0, .25);
      cursor: pointer;

      &.flat {
        background: #1a1a1b;
      }

      > i {
        margin-right: 5px;
        font-size: 24px;
      }

      > span {
        margin-bottom: 4px;
      }
    }
  }
}
</style>

<script>
import {toSvg} from 'jdenticon'
import {abbrAddress} from '@/utils/common'
import {roundOffDecimals} from '@/utils/math'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SendTransactionDetail',
  data: () => ({
    value: '0',
  }),
  async mounted() {
    this.calculate();
  },
  computed: {
    ...mapGetters(['pureBalance', 'sendTxData']),
    currentBalance() {
      return roundOffDecimals(this.pureBalance, 8)
    },
  },
  methods: {
    ...mapActions(['valueTransaction']),
    gravatar(address) {
      return toSvg(address, 30)
    },
    abbrAddress(address) {
      return abbrAddress(address)
    },
    calculate() {
      const value = parseFloat(this.value)
      console.log(value)
    },
    onClickCancel() {
      this.emitter.emit('onWalletPagePop')
    },
    async onClickSubmit() {
      this.emitter.emit('onWalletPagePush', 1)
      await this.valueTransaction()
    },
  },
}
</script>
