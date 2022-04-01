<template>
  <div class='container'>
    <div class='background'/>
    <div class='title'>
      Kola Wallet
    </div>
    <div class='logo'/>
    <!-- TODO : 컴포넌트 step 별로 분리 예정 -->
    <div
      v-if='step === 1'
      class='content'
    >
      <h2>Create a New Wallet</h2>
      <section class='input-box'>
        <custom-input
          ref='password'
          :type='hasVisiblePassword ? "password" : "text"'
          :content.sync='password'
          placeholder='ENTER PASSWORD'
          width='240px'
          :before-icon='["bx", hasVisiblePassword ? "bx-hide" : "bx-show-alt"]'
          @onClickIcon='hasVisiblePassword = !hasVisiblePassword'
        />
        <custom-input
          ref='confirmPassword'
          :type='hasVisiblePassword ? "password" : "text"'
          :content.sync='confirmPassword'
          placeholder='CONFIRM PASSWORD'
          width='240px'
          :before-icon='["bx", hasVisiblePassword ? "bx-hide" : "bx-show-alt"]'
          @onClickIcon='hasVisiblePassword = !hasVisiblePassword'
        />
      </section>
      <custom-button-group>
        <custom-button to='/' flat>
          <i class='bx bx-arrow-back'/>
          Go Back
        </custom-button>
        <custom-button
          primary
          @click='onClickCreateWallet'
        >
          Create Wallet
        </custom-button>
      </custom-button-group>
    </div>
    <div
      v-if='step === 2'
      class='content'
    >
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
    <div
      v-if='step === 3'
      class='content'
    >
      <section class='info-box'>
        <div class='icon'>
          <i class='bx bx-info-circle'/>
        </div>
        <div class='content'>
          <p>지갑이 생성되었습니다!</p>
          <p>비밀 복구 구문은 절대 복구할 수 없습니다.</p>
        </div>
      </section>
      <custom-button-group>
        <custom-button to='/' primary>
          Confirm
        </custom-button>
      </custom-button-group>
    </div>
  </div>
</template>

<style lang='scss' scoped>
// TODO : 임시 퍼블리싱 -> 추후 변경.
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 600px;
  background-color: #6E777C;
  background-image: url(/kola.png);
  background-size: cover;
  background-position: center;

  > .background {
    width: inherit;
    height: inherit;
    position: absolute;
    background: linear-gradient(transparent, #6E777C);
  }

  > .title {
    margin-top: 50px;
    color: #fff;
    font-size: 36px;
    font-weight: bold;
  }

  > .logo {
    width: 300px;
    height: 340px;
    position: relative;
  }

  > .content {
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

    > .info-box,
    > .alert-box {
      display: flex;
      position: relative;
      width: 320px;
      margin: 10px 0;
      padding: 10px;
      background: #1DDB1699;
      border-radius: 10px;
      color: #fff;
      font-size: 13px;

      > .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        font-size: 24px;
      }

      > .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;

        > p {
          margin: 0;
        }
      }
    }

    > .alert-box {
      background: #ED1C2499;
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
}
</style>

<script>
import CustomInput from "../components/common/CustomInput.vue"
import CustomButtonGroup from "../components/common/CustomButtonGroup.vue"
import CustomButton from "../components/common/CustomButton.vue"

export default {
  name: "CreateAccount",
  components: {
    CustomInput,
    CustomButtonGroup,
    CustomButton,
  },
  data: () => ({
    step: 1,
    password: '',
    confirmPassword: '',
    hasVisiblePassword: false,
    isBlurredSeedBox: true,
  }),
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
  async mounted() {
    this.autoBlurSeedBox()
    await this.$refs.password.focusIn()
  },
  methods: {
    autoBlurSeedBox() {
      setTimeout(() => {
        this.isBlurredSeedBox = true
        this.autoBlurSeedBox()
      }, 15000)
    },
    onClickGoBack() {
      if (this.step > 1) this.step -= 1
    },
    onClickCreateWallet() {
      this.step = 2
    },
    onClickConfirmSeedPhrase() {
      this.step = 3
    },
    onClickRevealSeedPhrase() {
      this.isBlurredSeedBox = false
    },
    onClickCopyClipboard() {
      this.$copyText(this.seeds.join(' '))
    },
  },
}
</script>
