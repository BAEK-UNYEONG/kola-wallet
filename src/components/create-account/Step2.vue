<template>
  <div class='content'>
    <h2>Create a New Wallet</h2>
    <custom-alert type='error'>
      <p>비밀 복구 구문을 적어 안전한 곳에 보관하세요.</p>
      <p>이 문구는 절대 누구에게도 주지 마세요!</p>
    </custom-alert>
    <section class='view-seed-box'>
      <div
        v-if='isBlurredSeedBox'
        class='blur'
      >
        <custom-button
          primary
          @click='onClickRevealSeedPhrase'
        >
          <i class='bx bx-show'/>
          Reveal Seed Phrase
        </custom-button>
      </div>
      <div class='item-box'>
        <div
          v-for='(item, index) in seeds' :key='index'
          class='item'
        >
          {{ item }}
        </div>
      </div>
      <div class='copy-box'>
        <custom-button
          flat
          @click='onClickCopyClipboard'
        >
          <i class='bx bx-copy'/>
          Copy to Clipboard
        </custom-button>
      </div>
    </section>
    <custom-button-group>
      <custom-button
        flat
        @click='onClickGoBack'
      >
        <i class='bx bx-arrow-back'/>
        Go Back
      </custom-button>
      <custom-button
        primary
        :disabled='!isConfirmedSeedPhrase'
        @click='onClickConfirmSeedPhrase'
      >
        Confirm Seed Phrase
      </custom-button>
    </custom-button-group>
  </div>
</template>

<style lang='scss' scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: -50px 0 10px;
  z-index: 1;

  > h2 {
    margin: 0;
    color: #fff;
  }

  > .view-seed-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 320px;
    margin: 0 0 10px;
    padding: 10px;
    background: #ffffff44;
    border-radius: 10px;
    overflow: hidden;

    > .blur {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin-top: -10px;
      position: absolute;
      background: #00000066;
      backdrop-filter: blur(5px);
    }

    > .item-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      > .item {
        display: flex;
        justify-content: center;
        width: 90px;
        margin-bottom: 10px;
        padding: 5px;
        border-radius: 5px;
        background-color: #fff;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }

  > .custom-button-group {
    margin: 5px 0;
  }
}
</style>

<script>
import CustomAlert from '../common/CustomAlert.vue'
import CustomInput from '../common/CustomInput.vue'
import CustomButtonGroup from '../common/CustomButtonGroup.vue'
import CustomButton from '../common/CustomButton.vue'
import {mapGetters} from 'vuex'

const TIMEOUT_SECONDS = 4

export default {
  name: 'CreateAccountStep2',
  components: {
    CustomAlert,
    CustomInput,
    CustomButtonGroup,
    CustomButton,
  },
  data: () => ({
    timer: null,
    isBlurredSeedBox: true,
    isConfirmedSeedPhrase: false,
  }),
  async mounted() {
    this.autoBlurSeedBox()
  },
  async beforeUnmount() {
    this.clearTimer()
  },
  computed: {
    ...mapGetters(['mnemonic']),
    seeds() {
      return this.mnemonic.split(' ')
    },
  },
  methods: {
    autoBlurSeedBox() {
      this.timer = setTimeout(() => {
        this.isBlurredSeedBox = true
        this.autoBlurSeedBox()
      }, TIMEOUT_SECONDS * 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    onClickRevealSeedPhrase() {
      this.clearTimer()
      this.autoBlurSeedBox()
      this.isBlurredSeedBox = false
      this.isConfirmedSeedPhrase = true
    },
    onClickCopyClipboard() {
      this.$copyText(this.mnemonic)
    },
    onClickGoBack() {
      this.$emit('onClickGoBack')
    },
    onClickConfirmSeedPhrase() {


      this.$emit('onClickGoTo', 3)
    },
  },
}
</script>
