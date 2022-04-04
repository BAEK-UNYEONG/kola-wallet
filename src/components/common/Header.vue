<template>
  <div class='common-header'>
    <div class='container'>
      <router-link to='/'>
        <!--        <font-awesome-icon :icon="['fas', 'house']"/>-->
        Kola Market
      </router-link>
    </div>
    <div class='right-side'>
      <div
        class='item'
        @click='onClickConnectWallet'
      >
        <!--        <font-awesome-icon :icon="['fas', 'wallet']"/>-->
        지갑 연결
      </div>
      <div class='label'>
        <!--        <font-awesome-icon :icon="['fas', 'coins']"/>-->
        Current Balance
        <span>
          {{ currentBalance }}
        </span>
        ETH
      </div>
      <div
        class='item'
        @click='onClickOpenWalletPopup'
      >
        {{ accountAddress }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.common-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, .8);

  > .container,
  > .right-side {
    > a, > .item, > .label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 8px 12px;
      border-radius: 8px;
      background: #363636;
      color: #fff;
      font-size: 13px;
      text-decoration: none;
      cursor: pointer;

      > i {
        margin-right: 5px;
      }

      > .alert {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        margin-left: 6px;
        padding: 0 6px 2px 5px;
        border-radius: 500rem;
        background: red;
        color: #fff;
        font-size: 11px;
        font-weight: bold;
      }
    }

    > .label {
      background: transparent;
      cursor: text;

      > span {
        margin: 0 5px;
        color: #ffe804;
      }
    }
  }

  > .container {
    display: flex;
    flex: 1;
    margin-left: 20px;

    > a, > .item, > .label {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  > .right-side {
    display: flex;
    margin-right: 20px;

    > a, > .item, > .label {
      color: #fff;

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>

<script>
// import {mapGetters, mapActions} from "vuex"

export default {
  name: 'Header',
  computed: {
    // ...mapGetters(["web3", "account", "balance"]),
  },
  methods: {
    // ...mapActions(["connectWallet", "disconnectWallet"]),
  }
}
</script>
