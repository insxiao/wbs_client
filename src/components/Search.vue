<template>
  <div class="search-container">
    <div class="search-box">
      <input class="simple-input" v-model="text" type="text" name="search-text">
      <div class="search-button" @click="search">
        <font-awesome-icon id="search-icon" icon="search" color="lightblue" size="2x"/>
      </div>
    </div>
    <toggle-group @updated="changeType" :items="toggleItems"></toggle-group>
    <simple-list ref="searchResultList" class="result-list" :items="items">
      <template name="header">
      </template>
      <!-- <post-item slot-scope="{ item, index }" :item="item" :id="item.id"></post-item> -->
      <component :is="type" slot-scope="{ item, index }" :item="item" :id="item.id"></component>

        <div @click="loadMore()" slot="footer" class="load-more">
          <p>{{ footerText }}</p>
        </div>

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
      next: {}
    }
  },
  methods: {
    search () {
      if (!this.text || this.text.length === 0) {
        this.$msg({
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
          this.$msg({ message: '无内容', type: 'warning' })
        }
      }).catch(reason => {
        this.$msg({ message: '错误：无法获取数据', type: 'error' })
      }).finally(() => loading.close())
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
      this.$client.axios
        .get(this.next.url)
        .then(r => {
          if (r.status === 200) {
            this.updateSearchResults(r.data)
          } else if (r.status === 204) {
            this.hideLoadMore()
            this.$msg({
              type: 'info',
              message: '无更多内容',
              duration: 500
            })
          }
        }).catch(reason => {
          this.$msg({
            type: 'error',
            message: '无法获取内容',
            duration: 500
          })
        })
    },
    showLoadMore () {
      this.$refs.searchResultList.showFooter()
    },
    hideLoadMore () {
      this.$refs.searchResultList.hideFooter()
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

  .search-button {
    position: absolute;
    top: 0;
    right: 5px;
    height: 100%;

    &:hover {
      cursor: pointer;
    }
  }

  #search-icon {
    height: 100%;
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
