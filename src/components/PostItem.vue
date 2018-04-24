<template>
  <div class="item-container">
    <div class="user" @click="$emit('clickAvatar', item.userId)">
      <img class="avatar" :src="avatarUrl"/>
      <div class="nick">{{ postOwner.name || 'username' }}</div>
    </div>
    <div class="content" @click="$emit('clickItem', id)"> {{ item.content }} </div>
    <div class="timestamp"> {{ item.timestamp | transformISODate }} </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'id'],
  data () {
    return {
      avatarUrl: undefined,
      postOwner: {}
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
        const dateDelimiter = '/'
        let date = _dt.toLocaleDateString().split(dateDelimiter)
        let time = _dt.toLocaleTimeString()
        let dateNow = new Date().toLocaleDateString().split(dateDelimiter)
        while ((date.length !== 0) && (date[0] === dateNow[0])) {
          date.shift()
          dateNow.shift()
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
  watch: {
    postOwner (newVal, oldVal) {
      if (newVal.avatar !== undefined && newVal.avatar !== null) {
        this.avatarUrl = this.$client.getAvatarUrl(newVal.avatar)
      }
    },
    avatarUrl (newVal, oldVal) {
      this.$logger.debug(`avatar url changed to ${newVal}`)
    }
  },
  created () { },
  mounted () {
    this.$client.getUserInfo({ userId: this.item.userId })
      .then(r => {
        if (r.status === 200) {
          this.postOwner = r.data
          this.$logger.debug('fetch user info ' + this.postOwner.id, this.postOwner)
        } else {
          this.$logger.warn('failed to load post owener data')
        }
      }).catch(reason => {
        this.$logger.debug('failed to fetch user info')
      })
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
