<template>
  <div class='container'>
    <div class='background'/>
    <Header/>
    <main-content
      ref='viewComponent'
      :index='index'
    />
    <Footer
      :index='index'
      @onClickIndex='onClickIndex'
    />
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
  background-color: #6E777C;

  > .background {
    position: absolute;
    width: inherit;
    height: inherit;
    background-image: url(/public/kola.png);
    opacity: .4;
    filter: blur(20px);
  }
}
</style>

<script>
import Header from '@/components/common/Header'
import MainContent from '@/components/wallet/MainContent'
import Footer from '@/components/common/Footer'
import CustomButton from '@/components/common/CustomButton'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'WalletIndex',
  components: {
    Header,
    MainContent,
    Footer,
    CustomButton,
  },
  data: () => ({
    index: 1,
  }),
  async mounted() {
    if (!this.isLogged) {
      await this.$router.push('/')
      return
    }
    await this.connectWallet()
  },
  computed: {
    ...mapGetters(['isLogged']),
  },
  methods: {
    ...mapActions(['connectWallet']),
    onClickIndex(index) {
      this.index = index
    },
  }
}
</script>
