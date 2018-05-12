<template>
  <v-layout column>
    <v-snackbar :value="snack.show">
      {{ snack.message }}
    </v-snackbar>
    <v-flex>
      <FollowUsers @click-user="openUserHome" :users="follows"></FollowUsers>
    </v-flex>
    <v-subheader>
      最新信息
    </v-subheader>
    <v-list>
      <PostItem
        @click-item="openPostDetail"
        @click-avatar="openUserHome"
        v-for="(item, index) in items"
        :item = item
        :id = "item.id"
        :key = index>
      </PostItem>

      <v-list-tile v-if="hasMore" key="load-more">
        <v-btn :loading="loading"
               block
               flat
               @click="loadMore"> load more </v-btn>
      </v-list-tile>
    </v-list>
  </v-layout>
</template>

<script>
import EventBus from './EventBus'
import FollowUsers from './FollowUsers'
import PostItem from './PostItem'

export default {
  name: 'Follow',
  components: {
    FollowUsers,
    PostItem
  },
  data () {
    return {
      follows: [],
      snack: {
        show: false,
        message: ''
      },
      items: [],
      next: {},
      hasMore: false,
      loading: false
    }
  },
  methods: {
    openPostDetail (itemId) {
      if (itemId) {
        this.$router.push('/post/' + itemId)
      }
    },
    openUserHome (userId) {
      if (userId) {
        this.$router.push('/homepage/' + userId)
      }
    },
    showMessage (message) {
      this.snack.show = true
      this.snack.message = message.messaage || message || 'error'
      setTimeout(() => { this.snack.show = false }, this.snack.timeout || 1000)
    },
    loadFollowedUsers () {
      this.$client.getFollowedUsers(
        resp => {
          this.$logger.debug('FOLLOW loadFollowedUsers', resp)
          if (resp.status === 200) {
            this.follows = resp.data
          } else if (resp.status === 204) {
            this.showMessage('用户当前无关注')
          } else if (resp.status === 401) {
            this.showMessage('用户权限错误')
          } else {
            this.showMessage('未知错误')
          }
        },
        reason => {
          if (!reason.response) {
            this.showMessage('服务器错误')
          } else if (!reason.request) {
            this.showMessage('客户端错误')
          }
        }
      )
    },
    loadFollowPosts () {
      const followerId = this.$appState.currentUser.id
      this.$client.getMostRecentPost({
        size: 10,
        offset: 0,
        followerId
      }).then(
        r => {
          this.$logger.debug('FOLLOW loadFollowPosts', r)
          if (r.status === 200) {
            this.items = r.data.posts
            this.next = r.data.next
            this.hasMore = this.items.length === r.data.next.params.size
          } else {
            this.$logger.debug('FOLLOW loadFollowPosts not 200', r)
          }
        },
        reason => {
          this.$logger.debug('FOLLOW loadFollowPosts reject', reason)
          if (!reason.request) {
            this.showMessage('客户端错误')
          } else if (!reason.response) {
            this.showMessage('服务器错误')
          } else {
            this.showMessage('未知错误')
          }
        }
      )
    },
    loadMore () {
      this.loading = true
      this.$client.axios.get(this.next.url)
        .then(
          resp => {
            if (resp.status === 200) {
              this.items = this.items.concat(resp.data.posts)
              this.next = resp.data.next
              this.hasMore = resp.data.posts.length === resp.data.next.params.size
            } else {
              this.showMessage('获取数据失败')
            }
          },
          reason => {

          }
        ).finally(() => { this.loading = false })
    }
  },
  created () {
    EventBus.$on('e-refresh', () => this.refresh())
    this.loadFollowedUsers()
    this.loadFollowPosts()
  }
}
</script>

<style scoped>

</style>
