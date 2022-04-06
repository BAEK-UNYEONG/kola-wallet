<template>
  <div class='common-header'>
    <div class='left-side'>
      <div class='profile' v-html='gravatar'/>
    </div>
    <div
      class='content'
      @click='onClickCopyClipboard'
    >
      <div class='account-name'>
        Main Account
      </div>
      <div class='account-address'>
        {{ abbrAddress }}
        <i class='bx bx-copy'/>
      </div>
    </div>
    <div class='right-side'>
      <div class='more'>
        <i class='bx bx-dots-vertical-rounded'/>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.common-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 80px;
  background: rgba(0, 0, 0, .8);

  > .left-side {
    margin-left: 20px;

    > .profile {
      width: 50px;
      height: 50px;
      border-radius: 500rem;
      background: #6E777C;
      overflow: hidden;
      cursor: pointer;
    }
  }

  > .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }

    > .account-name {
      color: #CC4E8E;
      font-size: 16px;
      font-weight: bold;
    }

    > .account-address {
      margin-top: 2px;
      color: #fff;
      font-size: 13px;
    }
  }

  > .right-side {
    margin-right: 20px;

    > .more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      color: #6E777C;
      font-size: 28px;
      cursor: pointer;
    }
  }
}
</style>

<script>
import {mapGetters, mapActions} from 'vuex'
import {toSvg} from 'jdenticon'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['address', 'abbrAddress', 'balance']),
    gravatar() {
      return toSvg(this.address, 50)
    }
  },
  methods: {
    // ...mapActions(['connectWallet']),
    onClickCopyClipboard() {
      this.$copyText(this.address)
    },
  }
}
</script>
