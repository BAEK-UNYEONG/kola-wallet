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
    <div class='contact-list'>
      <div
        v-for='(item, index) in filteredContactList' :key='index'
        class='item'
        @click='onClickSendTransaction(item)'
      >
        <div class='profile' v-html='gravatar(item)'/>
        <div class='address'>
          {{ abbrAddress(item) }}
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
    width: 340px;
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

  > .divider {
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
    background: #ffffff33;
  }

  > .contact-list {
    width: 340px;
    height: 310px;
    position: absolute;
    top: 229px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    > .item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      margin-bottom: 5px;
      position: relative;
      border-radius: 3px;
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

      > .profile {
        width: 30px;
        height: 30px;
        margin-left: 10px;
        border-radius: 500rem;
        background: #6E777C;
        overflow: hidden;
        cursor: pointer;
      }

      > .address {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin: 0 10px 2px;
        font-size: 13px;
      }
    }
  }
}
</style>

<script>
import {toSvg} from 'jdenticon'
import {abbrAddress} from '@/utils/common'
import {mapActions} from 'vuex'

export default {
  name: 'SendContact',
  data: () => ({
    searchValue: '',
    contactList: [
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
      '0x69f57ccEF1C2c26d2B328F2EB1BD4377742f90F3',
      '0xEE59279Fe9b5bDbe7D58E96233485225Da416042',
    ],
  }),
  async mounted() {
    this.$refs.search.focus()
  },
  computed: {
    filteredContactList() {
      return this.searchValue === ''
        ? this.contactList
        : this.contactList
          ?.filter(item => item.toLowerCase().includes(this.searchValue.toLowerCase()))
    },
  },
  methods: {
    ...mapActions(['updateSendTxData']),
    gravatar(address) {
      return toSvg(address, 30)
    },
    abbrAddress(address) {
      return abbrAddress(address)
    },
    onClickCancel() {
      this.emitter.emit('onWalletPagePop')
    },
    onClickClearSearchValue() {
      this.searchValue = ''
      this.$refs.search.focus()
    },
    async onClickSendTransaction(address) {
      await this.updateSendTxData({
        to: address,
      })
      this.emitter.emit('onWalletPagePush', 4)
    },
  },
}
</script>
