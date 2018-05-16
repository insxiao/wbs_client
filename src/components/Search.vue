<template>
  <div v-scroll="scroll" class="search-container">
    <v-snackbar
      top
      v-model="snack.show"
    >
      {{snack.message}}
      <v-btn flat color="primary" @click.native="snack.show = false">Close</v-btn>
    </v-snackbar>
    <div class="search-box">
    <v-layout row>
      <v-flex xs12>
        <v-text-field flat append-icon="search" :append-icon-cb="search" v-model="text" solo type="text" name="search-text">
        </v-text-field>
      </v-flex>
      </v-layout>
    </div>
    <toggle-group @updated="changeType" :items="toggleItems"></toggle-group>
    <simple-list class="result-list" :items="items">
      <template name="header">
      </template>
      <!-- <post-item slot-scope="{ item, index }" :item="item" :id="item.id"></post-item> -->
      <component :is="type"
                 @click-avatar="openUserHomepage"
                 @click-item="openPostDetail"
                 @click-user-item="openUserHomepage"
                 slot-scope="{ item, index }"
                 :item="item"
                 :id="item.id"></component>

        <v-list-tile ref="loadMore" slot="footer" class="load-more">
          <v-btn
            v-if="hasMore"
            @click="loadMore()"
            :loading="loading"
            block
            flat>{{ footerText }}</v-btn>
          <v-list-tile-content v-else>
            无更多数据
          </v-list-tile-content>
        </v-list-tile>

    </simple-list>
  </div>
</template>

<script>
import SimpleList from './SimpleList'
import PostItem from './PostItem'
import UserItem from './UserItem'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { default as ToggleGroup, ToggleItem } from './ToggleGroup'

export default {
  data () {
    return {
      text: '',
      toggleItems: [ ToggleItem.of('post', 'post'), ToggleItem.of('user', 'user') ],
      items: [],
      type: 'post',
      footerText: 'load more',
      next: {},
      hasMore: false,
      snack: {
        message: '',
        show: false
      },
      loading: false
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
    openUserHomepage (userId) {
      this.$router.push('/homepage/' + userId.toString())
    },
    openPostDetail (postId) {
      this.$router.push('/post/' + postId.toString())
    },
    search () {
      if (!this.text || this.text.length === 0) {
        this.showSnack({
          message: '请输入搜索内容', type: 'warning'
        })
        return
      }
      const loading = this.$loading()
      this.$client.search({
        q: this.text,
        type: this.type || 'post'
      }).then(r => {
        if (r.status === 200) {
          this.$logger.debug(r)
          this.setSearchResults(r.data)
          this.showLoadMore()
        } else if (r.status === 204) {
          this.showSnack({ message: '无内容', type: 'warning' })
        }
      }).catch(reason => {
        this.showSnack({ message: '错误：无法获取数据', type: 'error' })
      }).finally(() => loading.close())
    },
    showSnack (message) {
      this.snack.message = message.message || message
      this.snack.show = true
    },
    changeType (type) {
      this.type = type
      this.resetResultList()

      if (this.text !== undefined && this.text.length > 0) {
        this.search()
      }
    },
    updateSearchResults (data) {
      this.items = this.items.concat(data.data)
      this.next = data.next
      if (this.type === 'post') {
        this.hasMore = data.posts.length === data.next.params.size
      } else if (this.type === 'user') {
        this.hasMore = data.data.length === data.next.params.size
      }
    },
    setSearchResults (data) {
      this.items = data.data
      this.next = data.next
    },
    resetResultList () {
      this.hideLoadMore()
      this.items = []
    },
    loadMore () {
      if (this.loading || !this.hasMore) {
        return
      }
      this.$logger.debug('LOAD MORE ')
      this.loading = true
      this.$client.axios
        .get(this.next.url)
        .then(r => {
          if (r.status === 200) {
            this.updateSearchResults(r.data)
          } else if (r.status === 204) {
            this.hideLoadMore()
          }
        // }).catch(reason => {
        //   // this.showSnack({
        //     type: 'error',
        //     message: '无法获取内容',
        //     duration: 500
        //   })
        }).finally(() => {
          this.loading = false
        })
    },
    showLoadMore () {
      this.hasMore = true
    },
    hideLoadMore () {
      this.hasMore = false
    }
  },
  mounted () {
    this.hideLoadMore()
  },
  components: {
    SimpleList,
    PostItem,
    FontAwesomeIcon,
    ToggleGroup,
    'post': PostItem,
    'user': UserItem
  }
}
</script>

<style lang="less" scoped>
  @import '../css/common';

  .search-container {
    overflow-y: auto;
  }

  .search-box {
    width: 100%;
    position: relative;
    & .simple-input {
      width: 100%;
      padding: .5rem 1rem;
      padding-right: 2.5rem;
    }

    & .simple-input:focus {
      outline: none;
    }
  }

  .result-list {
    overflow-y: auto;
  }

  .load-more {
    font-size: 1rem;
    padding: 1rem;
    width: 100%;
    & p {
      text-align: center;
    }
  }
</style>
