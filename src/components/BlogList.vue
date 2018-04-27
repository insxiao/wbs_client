<template>
  <div class="container">
    <simple-list ref="simpleList" :items="items">
      <template slot-scope="{ item, index }">
        <post-item :item="item" :id="item.id"></post-item>
      </template>

      <div slot="footer" :style="footerStyle" :disabled="loadMoreDisabled" id="load-more" @click="loadMore">
        <p>{{ nextButtonText}}</p>
      </div>
    </simple-list>
  </div>
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
        }).finally(() => this.$nextTick(() => loading.close()))
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
    overflow-y: scroll;
    height: 100%;
  }

  #load-more {
    font-size: 1rem;
    padding: 1rem;
    width: 100%;
    & p {
      text-align: center;
    }
  }
</style>
