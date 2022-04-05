<template>
  <div class='content'>
    <custom-alert>
      <p>지갑을 복구했습니다!</p>
    </custom-alert>
    <custom-button-group>
      <custom-button to='/wallet/main' primary>
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
import CustomAlert from '../common/CustomAlert.vue'
import CustomButtonGroup from '../common/CustomButtonGroup.vue'
import CustomButton from '../common/CustomButton.vue'

export default {
  name: 'ImportWalletStep2',
  components: {
    CustomAlert,
    CustomButtonGroup,
    CustomButton,
  },
}
</script>
