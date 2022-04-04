<template>
  <div class='content'>
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
</template>

<script>
import CustomButtonGroup from "../common/CustomButtonGroup.vue";
import CustomButton from "../common/CustomButton.vue";

export default {
  name: "CreateAccountStep3",
  components: {
    CustomButtonGroup,
    CustomButton,
  },
}
</script>
