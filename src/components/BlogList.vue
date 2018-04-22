<template>
  <div class="container">
    <simple-list @scrollToBottom="loadMore()" :items="items">
      <post-item></post-item>
      <template slot-scope="{ item, index }">
        <post-item :post="item" :id="item.id"></post-item>
      </template>
    </simple-list>
  </div>
</template>

<script>
import SimpleList from './SimpleList'
import PostItem from './PostItem'
export default {
  data () {
    return {
      items: [],
      nextURL: null
    }
  },
  methods: {
  },
  components: {
    SimpleList,
    PostItem
  },
  created () {
    this.$client
      .getMostRecentPost()
      .then((r) => {
        if (r.status === 401) {
          throw new Error('Unauthorized')
        } else if (r.status === 200) {
          this.items = r.data.posts
          this.nextURL = r.data.next
        } else {
          throw new Error('failed to fetch blogs')
        }
      })
  }
}
</script>
