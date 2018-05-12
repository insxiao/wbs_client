<template>
<div class="wb-user-home">
  <v-snackbar :timeout="snack.timeout" top :value="snack.show" >
    {{snack.message}}
  </v-snackbar>
  <v-card color="primary" class="wb-header">
    <v-icon class="wb-header-settings" small @click="gotoProfile" v-show="isCurrentUser">settings</v-icon>
    <v-card-text>
      <v-layout row justify-center>
        <v-avatar style="border: pink solid 1px" text-xs-center class="mx-auto"
          :size="96">
            <img v-if="avatarUrl !== ''" :src="avatarUrl" alt="">
            <v-icon color="secondary" v-else :size="64">person_outline</v-icon>
        </v-avatar>
      </v-layout>
      <v-layout row justify-center>
          <v-subheader class="text-md-center"> {{ user.name || 'unknow' }} </v-subheader>
      </v-layout>
      <v-layout v-show="!isCurrentUser" row wrap>
         <v-btn round
                @click="follow"
                :loading="followLoading"
                depressed
                small
                v-if="!followed"
                class="mx-auto wb-follow-button"> 关注 </v-btn>
        <v-btn
          @click="unfollow"
          :loading="followLoading"
          round
          small
          class="mx-auto"
          v-else>已关注</v-btn>
       </v-layout>
    </v-card-text>
  </v-card>
  <div class="wb-content">
    <SimpleList :items="items">

      <PostItem
        slot-scope="{ item, index }"
        @click-item="openPostDetail"
        :item="item"
        :id="index"></PostItem>
      <v-btn
        flat
        block
        v-show="hasMore"
        @click="loadMore()"
        slot="footer">Load More<v-icon>refresh</v-icon></v-btn>
      <v-list-tile v-show="items === undefined || items === null || items.length === 0" slot="empty">
        <v-list-tile-content text-xs-center>No Content</v-list-tile-content>
      </v-list-tile>
    </SimpleList>
  </div>
</div>
</template>

<script>
import SimpleList from './SimpleList'
import AvatarCircle from './AvatarCircle'
import ButtonRoundSmall from './ButtonRoundSmall'
import PostItem from './PostItem'
import ButtonLoadMore from './ButtonLoadMore'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  components: {
    SimpleList,
    AvatarCircle,
    ButtonRoundSmall,
    PostItem,
    ButtonLoadMore,
    FontAwesomeIcon
  },
  props: {
    userId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      followButtonLabel: '+ follow',
      hasMore: false,
      items: [],
      user: {},
      next: {},
      snack: {
        messsage: '',
        show: false,
        timeout: 1000
      },
      followed: false,
      followLoading: false
    }
  },
  computed: {
    avatarUrl () {
      if (this.user.avatar) {
        return this.$client.getAvatarUrl(this.user.avatar)
      } else {
        return ''
      }
    },
    isCurrentUser () {
      this.$logger.debug(this.$appState)
      this.$logger.debug(this.userId)
      return this.$appState.currentUser.id.toString() === this.userId.toString()
    }
  },
  created () {
    this.$logger.debug('CREATED load user info')
    this.$logger.debug('props of user home ', this.userId)
    this.getUserInfo()
    this.getBlogList()
  },
  methods: {
    follow () {
      const followerId = this.$appState.currentUser.id
      const userId = this.user.id
      this.followLoading = true
      this.$client
        .follow({ userId, followerId })
        .then(resp => {
          if (resp.status === 200) {
            this.refreshFollowedStatus()
          }
        },
        reason => {
        }).finally(() => { this.followLoading = false })
    },
    unfollow () {
      const userId = this.user.id
      this.followLoading = true
      this.$client
        .unfollow({ userId })
        .then(resp => {
          if (resp.status === 200) {
            this.refreshFollowedStatus()
          }
        }).finally(() => {
          this.followLoading = false
        })
    },
    refreshFollowedStatus () {
      const userId = this.user.id
      this.$client.getFollowedUser({ userId: userId })
        .then(resp => {
          if (resp.status === 200) {
            this.followed = true
          } if (resp.status === 204) {
            this.followed = false
          }
        })
    },
    openPostDetail (postId) {
      this.$router.push('/post/' + postId)
    },
    gotoProfile () {
      this.$router.push('/main/profile')
    },
    showSnack (message) {
      if (typeof message === 'string') {
        this.snack.message = message
      } else if (typeof message === 'object') {
        this.snack.message = message.message
      } else {
        this.snack.message = '数据错误'
      }
      this.snack.show = true
      setTimeout(() => { this.snack.show = false }, this.snack.timeout)
    },
    getUserInfo () {
      this.$client.getUserInfo({
        userId: this.userId
      }).then(r => {
        if (r.status === 200) {
          this.user = r.data
        } else {
          throw new Error('cannot get user info')
        }
      }).catch(reason => {
        this.showSnack('无法获取用户信息')
      })
    },
    getBlogList () {
      this.$client.getMostRecentPost({
        size: 10,
        userId: this.userId
      }).then(r => {
        if (r.status === 200) {
          this.items = r.data.posts
          this.next = r.data.next
          if (r.data.posts.length > 0) {
            this.hasMore = true
          }
        } else {
          throw new Error('response status is ' + r.status)
        }
      }).catch(reason => {
        this.$logger.debug(reason)
        this.showSnack({
          message: '无法载入数据',
          type: 'error'
        })
      })
    },
    loadMore () {
      this.$logger.debug(this.next)
      this.$client
        .axios
        .get(this.next.url)
        .then(r => {
          if (r.status === 200) {
            if (r.data.posts.length > 0) {
              this.items = this.items.concat(r.data.posts)
              this.next = r.data.next
            } else {
              this.hasMore = false
              this.showSnack({
                message: '无更多数据',
                type: 'warning'
              })
            }
          } else {
            throw new Error('response status is ' + r.status)
          }
        })
        .catch(reason => {
          this.$logger.debug(reason)
          this.showSnack({
            message: '无法载入数据',
            type: 'error'
          })
        })
    }
  },
  watch: {
    user (newVal, oldVal) {
      this.refreshFollowedStatus()
    }
  }
}
</script>

<style lang="less" scoped>
.wb-header {
  position: relative;
}

.wb-home-name {
  text-align: center;
}
.wb-header-settings {
  position: relative;
  left: 94%;
}
</style>
