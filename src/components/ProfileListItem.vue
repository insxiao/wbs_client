<template>
  <div class="simple-list-item" id="container">
      <div class="title">{{item.name}}</div>
      <div @keydown="handleChange" class="value">{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: { item: { name: String, value: String } },
  data () {
      return {
        name: this.item.name,
        value: this.item.value,
        type: this.item.type
      }
  },
  methods: {
      /** @type {InputEvent} */
      handleChange (e) {
          const notAllowedKeys = /Digit[0-9]|Minus|Backspace/
          if (!notAllowedKeys.test(e.code)) {
              e.preventDefault()
          }
          console.debug(`type: ${e.type}\t key: ${e.key} \t code: ${e.code}`)
      }
  }
}
</script>

<style lang="less" scoped>
@import url("../css/common.less");

#container {
}

.title {
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    font-size: .5rem;
}

.value {
    font-size: 1rem;
}
</style>
