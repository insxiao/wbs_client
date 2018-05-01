<template>
<div class="wb-user-home">
  <div class="wb-header">
    <AvatarCircle class="wb-header-avatar"
      :url="avatarUrl"
      :size="96"/>
    <div class="wb-header-name"> {{ this.user.name || 'unknow' }} </div>
    <ButtonRoundSmall class="wb-follow-button"> {{ followButtonLabel }} </ButtonRoundSmall>
  </div>
  <div class="wb-content">
    <SimpleList :items="items">
      <PostItem
        slot-scope="{ item, index }"
        :item="item"
        :id="index"></PostItem>
      <ButtonLoadMore
        v-show="hasMore"
        class="wb-content-footer"
        @click="loadMore()"
        slot="footer">Load More</ButtonLoadMore>
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

export default {
  components: {
    SimpleList,
    AvatarCircle,
    ButtonRoundSmall,
    PostItem,
    ButtonLoadMore
  },
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      followButtonLabel: '+ follow',
      hasMore: false,
      items: [],
      user: {},
      next: {}
    }
  },
  computed: {
    avatarUrl () {
      if (this.user.avatar) {
        return this.$client.getAvatarUrl(this.user.avatar)
      } else {
        return this.$client.getAvatarUrl('80825813-d83f-4afe-80a5-f43f960de1cd')
      }
    }
  },
  created () {
    this.$logger.debug('CREATED load user info')
    this.getUserInfo()
    this.getBlogList()
  },
  methods: {
    getUserInfo () {
      this.$client.getUserInfo({
        userId: this.userId
      })
      .then(r => {
        if (r.status === 200) {
          this.user = r.data
        } else {
          throw new Error('cannot get user info')
        }
      }).catch(reason => {
        this.$msg({
          message: '无法获取用户信息',
          type: 'error'
        })
      })
    },
    getBlogList () {
      this.$client.getMostRecentPost({
        size: 10,
        userId: this.user.id
      }).then(r => {
        if (r.status === 200) {
          this.items = r.data.posts
          this.next = r.data.next
          if (r.data.posts.length > 0) {
            this.hasMore = true;
          }
        } else {
          throw new Error('response status is ' + r.status)
        }
      }).catch(reason => {
        this.$logger.debug(reason)
        this.$msg({
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
              this.$msg({
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
          this.$msg({
            message: '无法载入数据',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../css/common';
@home-primary-color: darken(@primary-color, 10%);

.wb-header-avatar {
  border: @home-primary-color solid 3px;
  margin-left: auto;
  margin-right: auto;
}
.wb-follow-button {
  display: block;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.wb-header {
  background: lighten(@neon-green, 20%);
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.wb-header-name {
  text-align: center;
}

.wb-content-footer {
  width: 100%;
}
</style>
