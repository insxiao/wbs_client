<template>
  <div @click="$emit('toggled', id, value)" :class="{ toggled: active }"  class="base-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number, Object],
    case: {
      type: String,
      default: 'default',
      validator (value) {
        return ['capitalize', 'upper', 'lower', 'default'].includes(value)
      }
    },
    active: {
      default: false
    },
    id: {
      required: false
    }
  },
  data () {
    return { }
  },
  computed: {
    styledText () {
      switch (this.case) {
        case 'lower': return this.text.toLowerCase()
        case 'upper': return this.text.toUpperCase()
        case 'capitalize': return this.text.charAt(0).toUpperCase() + this.text.slice(1).toLowerCase()
        default: return this.text
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../css/color';

  .toggled {
    background: @neon-blue !important;
  }

  .base-button {
    display: inline-block;
    box-sizing: border-box;
    background: @light-grey;
    padding: 0.5rem;
  }

</style>
