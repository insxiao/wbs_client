<template>
    <v-list class="container" ref="simpleList" :items="items">
      <template v-for="(item, idx) in items">
        <post-item
          @click-avatar="openUserHomepage"
          @click-item="openPostDetail"
          :item="item"
          :id="item.id"
          :key="idx"></post-item>
      </template>

      <v-btn block flat v-show="hasMore" :height="'128px'" :disabled="loadMoreDisabled" id="load-more" @click="loadMore">
        <p>{{ nextButtonText}}</p>
      </v-btn>
      <v-btn
        class="wb-fixed-button" fab
        bottom
        right
        small
        fixed
        color="pink"
        @click="newPost"
        >
          <v-icon style="line-height:40px" center>add</v-icon>
        </v-btn>
    </v-list>
</template>

<script>
import SimpleList from './SimpleList'
import PostItem from './PostItem'
export default {
  props: ['dataUrl'],
  data () {
    return {
      items: [],
      nextURL: null,
      nextButtonText: 'load more',
      loadMoreDisabled: false,
      hasMore: true,
      footerStyle: {
        display: 'none'
      }
    }
  },
  methods: {
    newPost () {
      this.$router.push('/new')
    },
    disableLoadMore () {
      this.nextButtonText = 'no more data'
      this.loadMoreDisabled = true
    },
    showLoadMore () {
      this.footerStyle.display = 'block'
    },
    loadMore () {
      this.$logger.debug('load more with ', this.nextURL)
      if (!this.hasMore) return
      const loading = this.$loading({ target: '#load-more' })
      this.$client
        .axios
        .get(this.nextURL)
        .then(r => {
          if (r.status === 200) {
            const newData = r.data.posts
            if (newData.length === 0) {
              this.disableLoadMore()
              this.hasMore = false
            } else {
              this.items = this.items.concat(r.data.posts)
              this.nextURL = r.data.next.url
            }
          }
        }).finally(() => loading.close())
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
  computed: { },
  components: {
    SimpleList,
    PostItem
  },
  created () {
    this.$client
      .getMostRecentPost({ size: 10 })
      .then((r) => {
        if (r.status === 401) {
          throw new Error('Unauthorized')
        } else if (r.status === 200) {
          this.items = r.data.posts
          this.nextURL = r.data.next.url
          this.$logger.debug(r.data.next)
          this.showLoadMore()
        } else {
          throw new Error('failed to fetch blogs')
        }
      })
  },
  mounted () { }
}
</script>

<style lang="less" scoped>

  @import '../css/common';

  .container {
    overflow-y: auto;

  }

  #load-more {
  }

  .wb-fixed-button {
    bottom: 64px;
  }
</style>
