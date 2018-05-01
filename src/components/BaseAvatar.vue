<template>
  <div :style="avatarStyle" class="base-avatar">
    <img class="base-avatar-img" :src="url" :alt="alt">
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: ''
    },
    size: {
      type: Number,
      default: 48
    },
    unit: {
      type: String,
      default: 'px'
    }
  },
  data () {
    return {
      avatarStyle: {
        width: this.size + this.unit,
        height: this.size + this.unit
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .base-avatar {
    overflow: hidden;
  }

  .base-avatar-img {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    max-height: auto;
  }
</style>
