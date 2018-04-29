<!--
  height:50px
  +--------------------+
  |  |                 |
  +--------------------+
 -->
<template>
  <div @click="$emit('click', item.id)" class="user-item">
    <div class="avatar">
      <img :src="$client.getAvatarUrl(item.avatar)" alt="">
    </div>
    <div class="username">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  props: ['item', 'id'],
  created () {

  }
}
</script>

<style lang="less" scoped>
@import '../css/common';
.user-item {
  height: 48px;
  line-height: 48px;
  clear: both;
  margin: 5px 1rem;
}
.avatar {
  float: left;
  border: black solid 1px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.username {
  padding-left: 50px + 1rem;
}
</style>
