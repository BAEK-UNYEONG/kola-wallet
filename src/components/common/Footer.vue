<template>
  <div class='common-footer'>
    <div class='item active'>
      <i class='bx bx-wallet'/>
    </div>
    <div class='item'>
      <i class='bx bx-history'/>
    </div>
    <div class='item'>
      <i class='bx bx-grid-alt'/>
    </div>
    <div class='item'>
      <i class='bx bx-transfer'/>
    </div>
    <div class='item'>
      <i class='bx bx-cog'/>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.common-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 60px;
  background: rgba(0, 0, 0, .8);

  > a, > .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: inherit;
    color: #999;
    font-size: 28px;
    cursor: pointer;

    &.active {
      margin-bottom: 5px;
      position: relative;
      color: #CC4E8E;

      &::after {
        position: absolute;
        bottom: -5px;
        width: 8px;
        height: 2px;
        content: '';
        border-bottom: 2px solid #CC4E8E;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'Footer',
  methods: {}
}
</script>
