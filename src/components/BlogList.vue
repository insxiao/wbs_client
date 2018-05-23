<template>
    <v-list id="wb-blog-list" v-scroll="scroll" class="blog-list-list">
      <v-snackbar :value="snack.show" top>
        {{snack.message}}
      </v-snackbar>
      <template v-for="item in items">
        <post-item
          @click-avatar="openUserHomepage"
          @click-item="openPostDetail"
          :item="item"
          :id="item.id"
          :key="item.id"></post-item>
      </template>

      <v-list-tile v-show="noContent">
        <v-list-tile-content>
          <p>No Content</p>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile  ref="loadMore" >
        <v-btn v-if="hasMore" block
               flat
               v-show="hasMore"
               :height="'128px'"
               :disabled="loadMoreDisabled"
               id="load-more"
               :loading="moreLoading"
               @click="loadMore">
          <p>load more</p>
        </v-btn>
        <v-list-tile-content v-else>
          <p text-xs-center>No Content</p>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
</template>

<script>
import SimpleList from './SimpleList'
import PostItem from './PostItem'
import EventBus from './EventBus'
export default {
  props: ['dataUrl'],
  data () {
    return {
      items: [],
      next: {},
      loadMoreDisabled: false,
      hasMore: false,
      moreLoading: false,
      snack: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    scroll (event) {
      const target = event.target.scrollingElement
      if (target.scrollTop + target.clientHeight >= target.offsetHeight - this.$refs.loadMore.$el.offsetHeight) {
        if (!this.loading && this.hasMore) {
          this.loadMore()
        }
      }
    },
    showSnack (message) {
      if (typeof message === 'object') {
        this.snack.messaage = message.message || 'error'
      } else {
        this.snack.message = message || 'error'
      }
      this.snack.show = true
      setTimeout(() => { this.snack.show = false }, this.snack.timeout || 1000)
    },
    reload () {
      return this.loadData()
    },
    loadData () {
      this.$logger.debug('|> start load data <|')
      return this.$client
        .getMostRecentPost({ size: 10 })
        .then((r) => {
          if (r.status === 401) {
            throw new Error('Unauthorized')
          } else if (r.status === 200) {
            this.items = r.data.posts
            this.hasMore = r.data.posts.length === r.data.next.params.size
            this.next = r.data.next
            this.$logger.debug('load data success', r.data)
          } else {
            throw new Error('failed to fetch blogs')
          }
        })
    },
    newPost () {
      this.$router.push('/new')
    },
    loadMore () {
      this.$logger.debug('load more with ', this.next)
      if (!this.hasMore || this.moreLoading) return
      this.moreLoading = true
      this.$client
        .axios
        .get(this.next.url)
        .then(r => {
          if (r.status === 200) {
            this.items = this.items.concat(r.data.posts)
            this.hasMore = r.data.posts.length === r.data.next.params.size
            this.next = r.data.next
          }
        }).finally(() => { this.moreLoading = false })
    },
    openUserHomepage (userId) {
      this.$logger.debug('open homepage of ', userId)
      this.$router.push({
        path: '/homepage/' + userId
      })
    },
    openPostDetail (id) {
      if (id !== undefined && id !== null) {
        this.$router.push('/post/' + id)
      }
    },
    noMoreData () {

    }
  },
  computed: {
    noContent () {
      return this.items === undefined || this.items === null || this.items.length === 0
    }
  },
  components: {
    SimpleList,
    PostItem
  },
  created () {
    if (EventBus) {
      EventBus.$on('e-new-item-post', () => this.reload())
      EventBus.$on('e-refresh', () => this.reload())
    } else {
      this.$logger.error('EventBus is undefined')
    }
    this.loadData()
  },
  beforeDestroy () {
    if (EventBus) {
      EventBus.$off('e-new-item-post')
      EventBus.$off('e-refresh')
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    overflow-y: auto;
  }

  #load-more {
  }
</style>
