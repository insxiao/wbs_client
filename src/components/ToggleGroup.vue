<template>
  <div class="group">
    <template v-for="(item, index) in items">
      <toggle-button :key="index" :id="index" class="toggle-item" @toggled="toggle" :active="currentActive === index" :value="item.value"> {{ item.label }} </toggle-button>
    </template>
  </div>
</template>

<script>
import ToggleButton from '@/components/ToggleButton'

export class ToggleItem {
  constructor (label, value) {
    this.label = label
    this.value = value
  }
  static of (label, value) {
    return new ToggleItem(label, value)
  }
}

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    default: { }
  },
  computed: {
  },
  data () {
    return {
      currentActive: 0
    }
  },
  methods: {
    toggle (idx, value) {
      this.$logger.debug('clicked', event, value)
      this.currentActive = idx
      this.$logger.debug('ToggleGroup toggle parameters', idx, value)
      this.$emit('updated', value)
    }
  },
  components: {
    ToggleButton
  }
}
</script>

<style lang="less" scoped>

  .group {
    box-sizing: border-box;
    text-align: center;
    display: flex;
  }

  .toggle-item {
    flex-grow: 1;
  }

</style>
