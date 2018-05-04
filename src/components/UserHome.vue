<template>
<div class="wb-user-home">
  <v-snackbar :timeout="snackbar.timeout" top :value="snackbar.show" >
    {{snackbar.message}}
  </v-snackbar>
  <v-card color="primary" class="wb-header">
    <div class="wb-header-settings">
      <v-icon v-show="isCurrentUser">settings</v-icon>
    </div>
    <v-card-text>
      <v-layout row justify-center>
        <v-avatar style="border: pink solid 1px" text-xs-center class="mx-auto"
          :size="96">
            <img v-if="avatarUrl !== ''" :src="avatarUrl" alt="">
            <v-icon color="secondary" v-else :size="64">person_outline</v-icon>
        </v-avatar>
      </v-layout>
      <v-layout row justify-center>
          <v-subheader class="text-md-center"> {{ this.user.name || 'unknow' }} </v-subheader>
      </v-layout>
      <v-layout row wrap>
         <v-btn round depressed small color="" v-show="!isCurrentUser" class="mx-auto wb-follow-button"> {{ followButtonLabel }} </v-btn>
       </v-layout>
    </v-card-text>
  </v-card>
  <div class="wb-content">
    <SimpleList :items="items">
      <PostItem
        slot-scope="{ item, index }"
        :item="item"
        :id="index"></PostItem>
      <v-btn
        flat
        block
        v-show="hasMore"
        @click="loadMore()"
        slot="footer">Load More<v-icon>refresh</v-icon></v-btn>
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
      snackbar: {
        messsage: '',
        show: false,
        timeout: 1000
      }
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
    showSnack (message) {
      if (typeof message === 'string') {
        this.snackbar.message = message
      } else if (typeof message === 'object') {
        this.snackbar.message = message.message
      } else {
        this.snackbar.message = '数据错误'
      }
      this.snackbar.show = true
      setTimeout(() => { this.snackbar.show = false }, this.snackbar.timeout)
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
  }
}
</script>

<style lang="less" scoped>
.wb-home-name {
  text-align: center;
}
.wb-header-settings {
  text-align: right;
}
</style>
