<!--
  height:50px
  +--------------------+
  |  |                 |
  +--------------------+
 -->
<template>
  <v-card class="user-item">
    <v-card-title  @click="$emit('click-user-item', item.id)">
      <v-avatar :size="48">
        <img v-if="avatarUrl != ''" :src="avatarUrl" alt="">
        <v-icon v-else>person_outline</v-icon>
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
        return ''
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
