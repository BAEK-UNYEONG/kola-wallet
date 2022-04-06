<template>
  <div class='content'>
    <h2>Create a New Wallet</h2>
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

  > h2 {
    margin: 0;
    color: #fff;
    text-align: center;
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
import CustomInput from '@/components/common/CustomInput'
import CustomButtonGroup from '@/components/common/CustomButtonGroup'
import CustomButton from '@/components/common/CustomButton'
import {generateAccount} from '@/utils/wallet'
import {mapMutations} from 'vuex'

export default {
  name: 'CreateAccountStep1',
  components: {
    CustomInput,
    CustomButtonGroup,
    CustomButton,
  },
  data: () => ({
    password: '',
    confirmPassword: '',
    hasVisiblePassword: true,
  }),
  async mounted() {
    await this.$refs.password.focusIn()
  },
  methods: {
    ...mapMutations(['SET_ADDRESS', 'SET_SEED_PHRASE', 'SET_PRIVATE_KEY']),
    async onClickCreateWallet() {
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
        alert('입력한 비  밀번호가 서로 일치하지 않습니다.')
        await this.$refs.password.focusIn()
        return
      }
      const {
        address,
        seedPhrase,
        privateKey,
      } = await generateAccount({
        password: this.password
      })
      this.SET_ADDRESS(address)
      this.SET_SEED_PHRASE(seedPhrase)
      this.SET_PRIVATE_KEY(privateKey)
      this.$emit('onClickGoTo', 2)
    },
  },
}
</script>
