<template>
  <BaseAvatar
    class="avatar-round"
    :unit="unit"
    :size="size"
    :url="url"
    :alt="alt" />
</template>

<script>
import BaseAvatar from './BaseAvatar'
export default {
  components: {
    BaseAvatar
  },
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
  }
}
</script>

<style lang="less" scoped>

  .avatar-round {
    border-radius: 50%;
  }

</style>
