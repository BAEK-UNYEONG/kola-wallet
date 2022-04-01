<template>
  <div
    :class='["custom-input", isFocused && "focused"]'
    :style='{width}'
  >
    <div
      v-if='beforeIcon || beforeLabel'
      class='prefix'
      :style='{
        width: beforeWidth
      }'
      @click='onClickIcon'
    >
      <i v-if='beforeIcon' :class='beforeIcon'/>
      <span
        v-if='beforeLabel'
        :style='{marginLeft: beforeIcon && "5px"}'
      >
        {{ beforeLabel }}
      </span>
    </div>
    <div
      class='input'
      v-bind='$attrs'
    >
      <input
        ref='input'
        v-bind='$attrs'
        v-model='currentContent'
        :spellcheck='false'
        @input='onInputContent'
        @focusin='isFocused = true'
        @focusout='isFocused = false'
        @change='onInputContent'
      >
    </div>
    <div
      v-if='afterIcon || afterLabel'
      class='suffix'
      :style='{
        width: afterWidth
      }'
      @click='onClickIcon'
    >
      <i v-if='afterIcon' :class='afterIcon'/>
      <span
        v-if='afterLabel'
        :style='{marginLeft: afterIcon && "5px"}'
      >
        {{ afterLabel }}
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.custom-input {
  display: flex;
  height: 36px;
  border-bottom: 2px solid #1a1a1b33;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  > .prefix, > .suffix {
    display: flex;
    align-items: center;
    padding: 0 7px;
    color: #fff;
    cursor: pointer;

    &:hover {
      color: #CC4E8E;
    }

    > span {
      line-height: 13px;
      font-size: 14px;
    }
  }

  > .input {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    > input {
      display: flex;
      flex: 1;
      height: 30px;
      margin: 0;
      padding: 0 0 0 5px;
      color: #fff;
      font-size: 16px;
      border: 0;
      background: transparent;
      outline: none;

      &::placeholder {
        color: #00000033;
        font-size: 13px;
      }

      &:disabled {
        background-color: #ffffff33;
      }

      &[type=color] {
        height: 20px;
        padding: 4px;
      }

      @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: .001dpcm) {
        &[type=color] {
          height: 30px;
          padding: 0 2px 0 2px;
        }
      }
    }
  }

  &.focused {
    border-color: #CC4E8E;

    > .prefix, > .suffix {
      color: #CC4E8E;
    }

    > .input {
      > input {

        color: #CC4E8E;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'CustomInput',
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    beforeIcon: {
      type: [String, Array],
      default: null
    },
    afterIcon: {
      type: [String, Array],
      default: null
    },
    beforeLabel: {
      type: String,
      default: null
    },
    afterLabel: {
      type: String,
      default: null
    },
    beforeWidth: {
      type: String,
      default: null
    },
    afterWidth: {
      type: String,
      default: null
    },
    isStore: {
      type: Boolean,
      default: false
    },
    // TODO : dynamic event handler 임시 해결책
    isChangeEvent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentContent: this.content,
      isFocused: false,
    }
  },
  watch: {
    content(content) {
      this.currentContent = content
    }
  },
  methods: {
    onClickIcon() {
      this.$emit('onClickIcon')
      this.$forceUpdate()
    },
    onInputContent(args) {
      if (
        this.$attrs.disabled ||
        this.$attrs.readonly ||
        (this.isChangeEvent && args.type !== 'change')
      )
        return
      if (
        this.$attrs.type === 'number' &&
        (this.$attrs.min || this.$attrs.max)
      ) {
        if (this.$attrs.min > this.currentContent)
          this.currentContent = this.$attrs.min
        if (this.$attrs.max < this.currentContent)
          this.currentContent = this.$attrs.max
      }
      this.$emit(this.isStore ? 'update' : 'update:content', this.currentContent)
    },
    async focusIn() {
      this.isFocused = true
      await this.$nextTick()
      this.$refs.input.focus()
    }
  }
}
</script>
