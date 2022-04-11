<template>
  <div class='common-footer'>
    <div
      v-for='(item, i) in iconList' :key='i'
      :class='["item", i === index - 1 && "active"]'
      @click='onClickIndex(i)'
    >
      <i :class='["bx", item]'/>
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
  border-top: 1px solid #CC4E8E;
  background: rgba(0, 0, 0, .8);
  z-index: 1;

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
  props: {
    index: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    currentIndex: 1,
  }),
  watch: {
    index(index) {
      this.currentIndex = index
    }
  },
  async mounted() {
    this.currentIndex = this.index
  },
  computed: {
    iconList() {
      return [
        'bx-wallet',
        'bx-history',
        'bx-grid-alt',
        'bx-transfer',
        'bx-cog',
      ]
    },
  },
  methods: {
    onClickIndex(index) {
      this.currentIndex = index + 1
      this.$emit('onClickIndex', this.currentIndex)
    },
  },
}
</script>
