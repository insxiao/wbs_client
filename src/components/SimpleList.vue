<template>
  <v-list class="list-container">
    <v-card :key="index" v-for="(item, index) in items">
      <slot :item="item" :index="index">
      </slot>
    </v-card>
    <slot name="footer" class="list-footer"></slot>
  </v-list>
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
