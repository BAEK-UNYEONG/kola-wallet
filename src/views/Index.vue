<template>
  <div class='container'>
    <div class='title'>
      Kola Wallet
    </div>
    <div class='logo'>
      <div class='background'/>
    </div>
    <div class='content'>
      <h2>Welcome to Kola Wallet</h2>
      <p>Your Digital Passport</p>
      <custom-button
        to='/create-account'
        block
        primary
      >
        Get Wallet
      </custom-button>
      <custom-button
        to='/import-wallet'
        block
      >
        Import Wallet
      </custom-button>
    </div>
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

  > .title {
    margin-top: 50px;
    color: #fff;
    font-size: 36px;
    font-weight: bold;
  }

  > .logo {
    width: 300px;
    height: 300px;
    position: relative;
    background-image: url('/public/kola.png');
    background-size: cover;
    background-position: center;

    > .background {
      width: inherit;
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(transparent, #6E777C);
    }
  }

  > .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    min-height: 240px;
    margin-top: -50px;
    z-index: 1;

    > h2 {
      margin: 0;
      color: #fff;
    }

    > p {
      color: #fff;
    }

    > .custom-button {
      margin: 5px 0;
    }
  }
}
</style>

<script>
import CustomButton from '@/components/common/CustomButton'
import {mapGetters} from 'vuex'

export default {
  name: 'Index',
  components: {
    CustomButton,
  },
  async mounted() {
    if (this.isLogged) {
      await this.$router.push('/wallet')
      return
    }
    console.log('started')
  },
  computed: {
    ...mapGetters(['isLogged']),
  },
}
</script>
