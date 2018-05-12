<template>
  <v-list class="list-container">
    <slot name="empty"></slot>
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
    return {}
  }
}
</script>
