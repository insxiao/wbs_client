<template>
    <v-list class="blog-list-list">
      <v-snackbar :value="snack.show" top>
        {{snack.message}}
      </v-snackbar>
      <template v-for="(item, idx) in items">
        <post-item
          @click-avatar="openUserHomepage"
          @click-item="openPostDetail"
          :item="item"
          :id="item.id"
          :key="idx"></post-item>
      </template>

      <v-list-tile v-show="noContent">
        <v-list-tile-content>
          No Content
        </v-list-tile-content>
      </v-list-tile>

      <v-btn block
             flat
             v-show="hasMore"
             :height="'128px'"
             :disabled="loadMoreDisabled"
             id="load-more"
             :loading="moreLoading"
             @click="loadMore">
        <p>{{ nextButtonText }}</p>
      </v-btn>
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
      nextURL: null,
      nextButtonText: 'load more',
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
      return this.$client
        .getMostRecentPost({ size: 10 })
        .then((r) => {
          if (r.status === 401) {
            throw new Error('Unauthorized')
          } else if (r.status === 200) {
            this.items = r.data.posts
            this.hasMore = true
            this.nextURL = r.data.next.url
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
      this.$logger.debug('load more with ', this.nextURL)
      if (!this.hasMore) return
      this.moreLoading = true
      this.$client
        .axios
        .get(this.nextURL)
        .then(r => {
          if (r.status === 200) {
            const newData = r.data.posts
            if (newData.length === 0) {
              this.hasMore = false
              this.showSnack('无更多数据')
            } else {
              this.items = this.items.concat(r.data.posts)
              this.nextURL = r.data.next.url
            }
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
  mounted () { }
}
</script>

<style lang="less" scoped>
  .container {
    overflow-y: auto;
  }

  #load-more {
  }
</style>
