<template>
  <v-card>
    <!-- main layout -->
    <v-card-title primary-title  @click="$emit('click-avatar', item.userId)">
      <v-avatar
        size="32px"
      >
        <img v-if="avatarUrl !== ''" :src="avatarUrl"/>
        <v-icon v-else>person_outline</v-icon>
      </v-avatar>
      <span>
          {{ user.name || 'username' }}
        </span>
    </v-card-title>
    <v-card-text class="content" @click="$emit('click-item', item.id)">
      {{ item.content }}
    </v-card-text>
    <v-footer
      text-xs-right
      class="timestamp">
      <v-spacer></v-spacer>{{ item.timestamp | transformISODate }}
    </v-footer>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'id'],
  data () {
    return {
      user: {}
    }
  },
  computed: {
    now () {
      return new Date().toLocaleString()
    },
    avatarUrl () {
      if (this.user.avatar) {
        return this.$client.getAvatarUrl(this.user.avatar)
      } else {
        return ''
      }
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
  },
  created () {
    this.$logger.debug(this.item)
  },
  mounted () {
    this.$client.getUserInfo({ userId: this.item.userId })
      .then(r => {
        if (r.status === 200) {
          this.user = r.data
          this.$logger.debug('fetch user info ' + this.user.id, this.user)
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

</style>
