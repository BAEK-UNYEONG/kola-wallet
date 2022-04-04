<template>
  <div class='container'>
    <div class='background'/>
    <div class='title'>
      Kola Wallet
    </div>
    <div class='logo'/>
    <component
      :is='viewComponent'
      @onClickGoTo='onClickGoTo'
      @onClickGoBack='onClickGoBack'
    />
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
import CreateAccountStep1 from "../components/create-account/Step1.vue"
import CreateAccountStep2 from "../components/create-account/Step2.vue"
import CreateAccountStep3 from "../components/create-account/Step3.vue"

const createAccountComponents = [
  CreateAccountStep1,
  CreateAccountStep2,
  CreateAccountStep3,
]

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
  }),
  computed: {
    viewComponent() {
      return createAccountComponents[this.step - 1]
    },
  },
  methods: {
    onClickGoTo(to) {
      this.step = to
    },
    onClickGoBack() {
      if (this.step > 1) this.step -= 1
    },
  },
}
</script>
