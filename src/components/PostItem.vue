<template>
  <div class="item-container">
    <div class="user" @click="$emit('clickAvatar', post.userId)">
      <img class="avatar" :src="avatarUrl"/>
      <div class="nick">{{ post.name || 'username' }}</div>
    </div>
    <div class="content" @click="$emit('clickItem', id)"> {{ post.content }} </div>
    <div class="timestamp"> {{ post.timestamp | transformISODate }} </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'id'],
  data () {
    return {
      avatarUrl: 'hello'
    }
  },
  computed: {
    now () {
      return new Date().toLocaleString()
    }
  },
  filters: {
    transformISODate (datetime) {
      let _dt
      if ((typeof datetime) === 'number') {
        _dt = new Date(datetime)
      } else if ((typeof datetime) === 'string' && !isNaN(Date.parse(datetime))) {
        _dt = new Date(Date.parse(datetime))
      } else if (Object.getPrototypeOf(datetime).constructor === Date) {
        _dt = datetime
      }
      if (!_dt) {
        return datetime
      } else {
        let date = _dt.toLocaleDateString().split('-')
        let time = _dt.toLocaleTimeString()
        let dateNow = new Date().toLocaleDateString().split('_')
        while ((date.length !== 0) && (date[0] === dateNow[0])) {
          date.shift()
          dateNow.shift()
          console.log('?????')
        }
        if (date.length === 0) {
          return time
        } else if (date.length === 1) {
          return date[0] + '日 ' + time
        } else if (date.length === 2) {
          return date[0] + '月' + date[1] + '日 ' + time
        } else if (date.length === 3) {
          return date[0] + '年' + date[1] + '月' + date[2] + '日 ' + time
        }
      }
    }
  },
  created () {
    console.log(this)
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/common.less');

  .mo {
    outline: none;
  }

  .item-container {
    // background: aqua;
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
    height: 4rem;
    margin-bottom: 8px;
    .mo;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .timestamp {
    display: inline-block;
    height: 1rem;
    font-size: .8rem;
    line-height: 1rem;
    text-align: right;
    .mo;
  }

  .display-none {
    display: none;
  }

</style>
