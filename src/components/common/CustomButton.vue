<template>
  <div
    :class="[
      'custom-button',
      block && 'block',
      flat && 'flat',
      primary && 'primary',
      disabled && 'disabled',
    ]"
    @click='onClickButton'
  >
    <slot/>
  </div>
</template>

<style lang='scss'>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 36px;
  padding: 0 10px;
  border-radius: 10px;
  background: #1a1a1b;
  color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, .25);
  cursor: pointer;

  &:active {
    background: #ffe804;
    color: #1a1a1b;
  }

  &.flat {
    background: transparent;
    color: #CC4E8E;
    box-shadow: none;

    &:hover {
      background: #CC4E8E44;
      color: #fff;
      font-weight: normal;
    }

    &:active {
      background: #CC4E8E22;
      color: #1a1a1b;
    }
  }

  &.block {
    width: 100%;
  }

  &.primary {
    background: #CC4E8E;
  }

  &.disabled {
    opacity: .5;
    pointer-events: none;
  }

  > i {
    margin-right: 5px;
  }
}
</style>

<script>
export default {
  name: 'CustomButton',
  props: {
    to: {
      type: String,
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickButton() {
      if (this.to) {
        this.$router.push(this.to)
      }
    },
  }
}
</script>
