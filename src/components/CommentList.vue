<template>
  <v-list>
    <slot name="header"></slot>
    <slot
      v-for="(item, index) in items"
      :item="item"
      :index="index">
    </slot>
    <slot v-if="empty" name="empty">
      list is empty
    </slot>
      <slot name="footer"></slot>
  </v-list>
</template>

<script>
export default {
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
