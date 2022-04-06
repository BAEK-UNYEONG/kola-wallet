<template>
  <div class='content'>
    <custom-alert>
      <p>지갑이 생성되었습니다!</p>
      <p>비밀 복구 구문은 절대 복구할 수 없습니다.</p>
    </custom-alert>
    <custom-button-group>
      <custom-button to='/wallet-main' primary>
        Confirm
      </custom-button>
    </custom-button-group>
  </div>
</template>

<style lang='scss' scoped>
.content {
  > .custom-button-group {
    margin: 5px 0;
  }
}
</style>

<script>
import CustomAlert from '@/components/common/CustomAlert'
import CustomButtonGroup from '@/components/common/CustomButtonGroup'
import CustomButton from '@/components/common/CustomButton'

export default {
  name: 'CreateAccountStep3',
  components: {
    CustomAlert,
    CustomButtonGroup,
    CustomButton,
  },
}
</script>
