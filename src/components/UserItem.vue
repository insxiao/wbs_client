<!--
  height:50px
  +--------------------+
  |  |                 |
  +--------------------+
 -->
<template>
  <v-card class="user-item">
    <v-card-title  @click="$emit('click-item', item.id)">
      <v-avatar :size="48">
        <img :src="avatarUrl" alt="">
      </v-avatar>
      <span class="wb-useritem-name">{{item.name}}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'id'],
  created () {
    console.log(this.item)
  },
  computed: {
    avatarUrl () {
      if (this.item.avatar) {
        return this.$client.getAvatarUrl(this.item.avatar)
      } else {
        return this.$client.getAvatarUrl('2235d379-0313-4f6e-b837-f118b9e5eba3')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wb-useritem-name {
  display: inline-block;
  padding-left: 12px;
}
</style>
