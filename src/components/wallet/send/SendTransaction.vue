<template>
  <div class='content'>
    <div class='title'>
      <div class='label'>
        보내기
      </div>
    </div>
    <div class='send-info-box'>
      <div class='icon'>
        <i class='bx bxs-check-circle'/>
      </div>
      <div class='address'>
        <div class='abbr-address'>
          {{ abbrAddress(sendTxData.to) }}
        </div>
        <div class='pure-address'>
          {{ sendTxData.to }}
        </div>
      </div>
      <div
        class='event'
        @click='onClickCancel'
      >
        <i class='bx bx-x'/>
      </div>
    </div>
    <div class='divider'/>
    <div class='send-input-box-list'>
      <div class='item eth'>
        <div class='label'>자산:</div>
        <div class='input'>
          <div class='icon'/>
          <div class='description'>
            <div class='label'>
              잔액:
            </div>
            <div class='value'>
              {{ currentBalance }} ETH
            </div>
          </div>
          <input value='ETH' readonly>
        </div>
      </div>
      <div
        class='item'
        @click='onClickFocusValue'
      >
        <div class='label'>
          금액:
          <div class='max'>
            최대
          </div>
        </div>
        <div class='input'>
          <input
            ref='value'
            v-model='value'
            :style='{width: `${value.length * 10}px`}'
          >
          <div class='suffix'>
            ETH
          </div>
        </div>
      </div>
    </div>
    <div class='divider'/>
    <div class='button-group'>
      <div
        class='button flat'
        @click='onClickCancel'
      >
        <span>취소</span>
      </div>
      <div
        class='button'
        @click='onClickSubmit'
      >
        <span>다음</span>
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

  > .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;

    > .label,
    > .cancel {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > .label {
      flex: 1;
      color: #fff;
      font-size: 18px;
    }

    > .cancel {
      width: 40px;
      height: 20px;
      padding-bottom: 2px;
      color: #CC4E8E;
      font-size: 13px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, .25);
      cursor: pointer;

      &:active {
        background-color: rgba(0, 0, 0, .1);
      }
    }
  }

  > .send-info-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 60px;
    margin: 5px 0 20px 0;
    border: 1px solid #CC4E8E;
    border-radius: 5px;
    background: rgba(255, 255, 255, .6);

    > .icon,
    > .event {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      margin: 1px 0 0;
      color: #1a1a1b;
      font-size: 24px;
    }

    > .icon {
      color: #CC4E8E;
      font-size: 18px;
    }

    > .event {
      cursor: pointer;

      &:active {
        opacity: .8;
      }
    }

    > .address {
      display: flex;
      flex: 1;
      flex-direction: column;
      color: #1a1a1b;

      > .abbr-address {
        font-size: 18px;
        font-weight: bold;
      }

      > .pure-address {
        margin: 0 0 2px 1px;
        font-size: 12px;
        word-wrap: break-word;
      }
    }
  }

  > .send-input-box-list {
    display: flex;
    flex-direction: column;

    > .item {
      display: flex;
      width: 340px;
      height: 56px;
      margin-bottom: 20px;

      > .label {
        display: flex;
        align-items: center;
        width: 100px;
        color: #fff;
        font-size: 18px;

        > .max {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 20px;
          margin: 0 0 0 10px;
          padding-bottom: 2px;
          color: #CC4E8E;
          font-size: 13px;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, .25);
          cursor: pointer;

          &:active {
            background-color: rgba(0, 0, 0, .1);
          }
        }
      }

      > .event {
        cursor: pointer;

        &:active {
          opacity: .8;
        }
      }

      > .input {
        display: flex;
        position: relative;
        width: 240px;
        height: 56px;
        border: 1px solid #fff;
        border-radius: 5px;
        background: rgba(0, 0, 0, .1);
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .6) inset;

        > .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 12px;
          left: 9px;
          width: 30px;
          height: 30px;
          border: 1px solid #fff;
          border-radius: 500rem;
          background-color: rgba(255, 255, 255, .5);
          background-image: url(/public/ethereum.png);
          background-repeat: no-repeat;
          background-size: 80%;
          background-position: center;
        }

        > .description {
          display: flex;
          justify-content: space-between;
          position: absolute;
          top: 30px;
          left: 50px;
          color: #fff;
          font-size: 13px;
          opacity: .9;

          > .label {
            margin-right: 30px;
          }
        }

        > input {
          width: fit-content;
          max-width: 170px;
          height: 30px;
          padding: 5px 20px 10px 10px;
          border: 0;
          background: transparent;
          color: #fff;
          font-size: 16px;
          outline: none;

          &::placeholder {
            color: #ccc;
          }
        }

        > .suffix {
          padding: 8px 0;
          color: #fff;
        }
      }

      &.eth > .input > input {
        padding-left: 50px;
      }
    }
  }

  > .divider {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #ffffff33;
  }

  > .button-group {
    display: flex;

    > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 36px;
      margin: 0 10px 20px 10px;
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
import {abbrAddress} from '@/utils/common'
import {roundOffDecimals} from '@/utils/math'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SendTransaction',
  data: () => ({
    value: '0',
  }),
  async mounted() {
    this.$refs.value.focus()
  },
  computed: {
    ...mapGetters(['pureBalance', 'sendTxData']),
    currentBalance() {
      return roundOffDecimals(this.pureBalance, 8)
    },
  },
  methods: {
    ...mapActions(['updateSendTxData']),
    abbrAddress(address) {
      return abbrAddress(address)
    },
    onClickCancel() {
      this.emitter.emit('onWalletPagePop')
    },
    async onClickSubmit() {
      await this.updateSendTxData({
        value: this.value,
      })
      this.emitter.emit('onWalletPagePush', 5)
    },
    onClickFocusValue() {
      this.$refs.value.focus()
    },
  },
}
</script>
