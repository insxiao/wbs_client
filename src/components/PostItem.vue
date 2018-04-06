<template>
  <div class="item-container">
    <div class="user"><img class="avatar" :src="avatarUrl"/><div class="nick"></div>
    </div>
    <div class="content"></div>
    <div class="timestamp"> {{ now }} </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatarUrl: 'https://assets.servedby-buysellads.com/p/manage/asset/id/61450'
    }
  },
  computed: {
    now () {
      return new Date().toLocaleString()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/common.less');

  .mo {
    outline: none;
  }

  .item-container {
    background: aqua;
    border-bottom: @dark-grey solid 1px;
    display: flex;
    flex-direction: column;
    padding: 8px 8px 8px 32px;
  }

  @user-info-height: 24px;
  .user {
    position: relative;
    margin-bottom: 8px;
    .mo;
  }

  .avatar {
    display: block;
    position: absolute;
    max-width: 24px;
    max-height: 24px;
    overflow: hidden;
    left: -28px;
    .mo;
  }

  .nick {
    height: 24px;
    line-height: 24px;
  }

  .content {
    height: 6rem;
    margin-bottom: 8px;
    .mo;
  }

  .timestamp {
    display: inline-block;
    height: 1rem;
    font-size: .8rem;
    line-height: 1rem;
    text-align: right;
    .mo;
  }

</style>
