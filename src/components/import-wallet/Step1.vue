<template>
  <div class='content'>
    <h2>
      Import a wallet
      <br>
      using seed phrase
    </h2>
    <custom-alert type='error'>
      <p>각 문구를 공백으로 구분해주세요.</p>
      <p>(예: half pave catalog...)</p>
    </custom-alert>
    <h5>
      여기에 12 단어의 비밀 문구를 입력하여
      <br>
      지갑을 복원하세요.
    </h5>
    <section class='input-box'>
      <custom-input
        ref='secretRecoveryPhrase'
        :type='hasVisibleSecretRecoveryPhrase ? "password" : "text"'
        :content='secretRecoveryPhrase'
        placeholder='SECRET RECOVERY PHRASE'
        width='240px'
        :before-icon='["bx", hasVisibleSecretRecoveryPhrase ? "bx-hide" : "bx-show-alt"]'
        @update:content='v => secretRecoveryPhrase = v'
        @onClickIcon='hasVisibleSecretRecoveryPhrase = !hasVisibleSecretRecoveryPhrase'
      />
    </section>
    <section class='input-box'>
      <custom-input
        ref='password'
        :type='hasVisiblePassword ? "password" : "text"'
        :content='password'
        placeholder='ENTER PASSWORD'
        width='240px'
        :before-icon='["bx", hasVisiblePassword ? "bx-hide" : "bx-show-alt"]'
        @update:content='v => password = v'
        @onClickIcon='hasVisiblePassword = !hasVisiblePassword'
      />
      <custom-input
        ref='confirmPassword'
        :type='hasVisiblePassword ? "password" : "text"'
        :content='confirmPassword'
        placeholder='CONFIRM PASSWORD'
        width='240px'
        :before-icon='["bx", hasVisiblePassword ? "bx-hide" : "bx-show-alt"]'
        @update:content='v => confirmPassword = v'
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
</template>

<style lang='scss' scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: -50px 0 10px;
  z-index: 1;

  > h2, > h5 {
    margin: 0;
    color: #fff;
    text-align: center;
  }

  > h5 {
    font-weight: normal;
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
import CustomAlert from '../common/CustomAlert.vue'
import CustomInput from '../common/CustomInput.vue'
import CustomButtonGroup from '../common/CustomButtonGroup.vue'
import CustomButton from '../common/CustomButton.vue'
import KolaWalletAPI from '../../api/KolaWalletAPI'
import {mapMutations} from 'vuex'

export default {
  name: 'ImportWalletStep1',
  components: {
    CustomAlert,
    CustomInput,
    CustomButtonGroup,
    CustomButton,
  },
  data: () => ({
    secretRecoveryPhrase: '',
    password: '',
    confirmPassword: '',
    hasVisibleSecretRecoveryPhrase: true,
    hasVisiblePassword: true,
  }),
  async mounted() {
    await this.$refs.secretRecoveryPhrase.focusIn()
  },
  methods: {
    ...mapMutations(['SET_ADDRESS', 'SET_MNEMONIC']),
    async onClickCreateWallet() {
      if (this.secretRecoveryPhrase === '') {
        alert('비밀 복구 구문을 입력하지 않았습니다.')
        await this.$refs.secretRecoveryPhrase.focusIn()
        return
      }
      if (this.secretRecoveryPhrase.trim().split(' ').length < 12) {
        alert('정상적인 비밀 복구 구문이 아닙니다.')
        await this.$refs.secretRecoveryPhrase.focusIn()
        return
      }
      if (this.password === '') {
        alert('비밀번호를 입력하지 않았습니다.')
        await this.$refs.password.focusIn()
        return
      }
      if (this.confirmPassword === '') {
        alert('비밀번호 확인을 입력하지 않았습니다.')
        await this.$refs.confirmPassword.focusIn()
        return
      }
      if (this.password !== this.confirmPassword) {
        alert('입력한 비밀번호가 서로 일치하지 않습니다.')
        await this.$refs.password.focusIn()
        return
      }
      const {
        address,
        mnemonic,
      } = await KolaWalletAPI.generate({
        password: this.password,
        mnemonic: this.secretRecoveryPhrase,
      })
      this.SET_ADDRESS(address)
      this.SET_MNEMONIC(mnemonic)
      this.$emit('onClickGoTo', 2)
    },
  },
}
</script>
