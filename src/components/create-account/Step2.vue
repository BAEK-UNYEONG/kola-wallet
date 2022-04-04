<template>
  <div class='content'>
    <h2>Create a New Wallet</h2>
    <section class='alert-box'>
      <div class='icon'>
        <i class='bx bx-error'/>
      </div>
      <div class='content'>
        <p>비밀 복구 구문을 적어 안전한 곳에 보관하세요.</p>
        <p>이 문구는 절대 누구에게도 주지 마세요!</p>
      </div>
    </section>
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

  > p {
    color: #fff;
  }

  > .input-box {
    margin: 10px 0;
    padding: 10px;
    background: #ffffff44;
    border-radius: 10px;
  }

  > .custom-button-group {
    margin: 5px 0;
  }
}
</style>

<script>
import CustomInput from "../common/CustomInput.vue"
import CustomButtonGroup from "../common/CustomButtonGroup.vue";
import CustomButton from "../common/CustomButton.vue";

export default {
  name: "CreateAccountStep2",
  components: {
    CustomInput,
    CustomButtonGroup,
    CustomButton,
  },
  data: () => ({
    isBlurredSeedBox: true,
  }),
  async mounted() {
    this.autoBlurSeedBox()
  },
  computed: {
    seeds() {
      // dummy
      return [
        'never',
        'helmet',
        'pet',
        'salmon',
        'head',
        'squeeze',
        'desk',
        'circle',
        'camp',
        'rude',
        'recycle',
        'hat',
      ]
    },
  },
  methods: {
    autoBlurSeedBox() {
      setTimeout(() => {
        this.isBlurredSeedBox = true
        this.autoBlurSeedBox()
      }, 15000)
    },
    onClickRevealSeedPhrase() {
      this.isBlurredSeedBox = false
    },
    onClickCopyClipboard() {
      this.$copyText(this.seeds.join(' '))
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
