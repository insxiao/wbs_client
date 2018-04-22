<template>
  <ol class="container">
    <li :key="index" v-for="(item, index) in items">
      <slot :item="item" :index="index">
        ÎŞÄÚÈİ
      </slot>
    </li>
  </ol>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return { }
  }
}
</script>

<style lang="less" scoped>
  @import '../css/common.less';
  li {
    list-style: none;
  }
</style>
