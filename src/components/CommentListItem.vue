<template>
  <v-list-tile>
    <v-list-tile-content>
    <v-list-tile-title>{{user.name}}</v-list-tile-title>
    <v-list-tile-sub-title>
      {{comment.content}}
    </v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      validator (comment) {
        const required = ['content', 'userId', 'postId']
        return required.every(key =>
          comment.hasOwnProperty(key))
      }
    }
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.$logger.debug('Comment List Item created with', this.comment)
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$client
        .getUserInfo({ userId: this.comment.userId })
        .then(r => {
          if (r.status === 200) {
            this.user = r.data
          }
        }).catch(reason => {
          this.$logger.debug('get user info failed with', reason)
        })
    }
  }
}
</script>

<style>

</style>
