<template>
  <div class='content'>
    <custom-alert>
      <p>지갑을 복구했습니다!</p>
    </custom-alert>
    <custom-button-group>
      <custom-button to='/wallet' primary>
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
  name: 'ImportWalletStep2',
  components: {
    CustomAlert,
    CustomButtonGroup,
    CustomButton,
  },
}
</script>
