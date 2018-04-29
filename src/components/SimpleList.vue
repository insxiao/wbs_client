<template>
  <ol class="list-container">
    <li :key="index" v-for="(item, index) in items">
      <slot :item="item" :index="index">
      </slot>
    </li>
    <li :class="{ 'display-none': fHideFooter }">
      <slot name="footer" class="list-footer"></slot>
    </li>
  </ol>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      fHideFooter: false
    }
  },
  methods: {
    hideFooter () {
      this.fHideFooter = true
    },
    showFooter () {
      this.fHideFooter = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../css/common.less';
  li {
    list-style: none;
  }

  .list-container {
  }

  .display-none {
    display: none;
  }

</style>
