<template>
  <div class="custom-button-group">
    <slot/>
  </div>
</template>

<style lang="scss">
.custom-button-group {
  display: flex;
  > .custom-button {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>

<script>
export default {
  name: "CustomButtonGroup"
}
</script>
