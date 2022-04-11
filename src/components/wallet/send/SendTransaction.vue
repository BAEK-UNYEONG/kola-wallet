<template>
  <div class='content'>
    <div class='title'>
      <div class='label'>
        보낼 대상 :
      </div>
      <div
        class='cancel'
        @click='onClickCancel'
      >
        취소
      </div>
    </div>
    <div class='search-input-box'>
      <div class='icon'>
        <i class='bx bx-search-alt-2'/>
      </div>
      <div class='input'>
        <input
          ref='search'
          v-model='searchValue'
          placeholder='검색, 공개 주소(0x)'
          autofocus
        />
      </div>
      <div
        class='event'
        @click='onClickClearSearchValue'
      >
        <i class='bx bx-x'/>
      </div>
    </div>
    <div class='divider'/>
    <div class='tx-list'>
      <div
        v-for='(item, index) in contactList' :key='index'
        class='item'
      >

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

  > .search-input-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 36px;
    margin: 5px 0 20px 0;
    border: 1px solid #fff;
    border-radius: 5px;
    background: rgba(0, 0, 0, .1);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, .6) inset;

    > .icon,
    > .event {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      margin: 1px 0 0;
      color: #fff;
      font-size: 24px;
    }

    > .event {
      cursor: pointer;

      &:active {
        opacity: .8;
      }
    }

    > .input {
      display: flex;
      flex: 1;

      > input {
        width: 100%;
        height: 24px;
        border: 0;
        background: transparent;
        color: #fff;
        font-size: 14px;
        outline: none;

        &::placeholder {
          color: #ccc;
        }
      }
    }
  }

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
import {mapGetters} from 'vuex'

dayjs().format()

export default {
  name: 'SendTransaction',
  data: () => ({
    searchValue: '',
    contactList: [],
  }),
  async mounted() {
    this.$refs.search.focus()
  },
  computed: {
    ...mapGetters(['web3', 'address', 'balance', 'exchangeBalance', 'selectedExchange', 'txList', 'isLogged']),
  },
  methods: {
    onClickCancel() {
      this.$emit('onClickIndex', 1)
    },
    onClickClearSearchValue() {
      this.searchValue = ''
      this.$refs.search.focus()
    },
  },
}
</script>
