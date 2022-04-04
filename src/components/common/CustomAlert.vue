<template>
  <section :class='[`custom-${type}-box`]'>
    <div class='icon'>
      <i :class='["bx", `bx-${iconName}`]'/>
    </div>
    <div class='content'>
      <slot/>
    </div>
  </section>
</template>

<style lang='scss'>
.custom-info-box,
.custom-error-box {
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

.custom-error-box {
  background: #ED1C2499;
}
</style>

<script>
export default {
  name: 'CustomAlert',
  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    iconName() {
      let result = 'info-circle'
      switch (this.type) {
        case 'error':
          result = 'error'
          break
      }
      return result
    },
  },
}
</script>
