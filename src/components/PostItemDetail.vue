<template>
  <v-flex>
    <v-card>
      <v-card-title primary-title color="primary-color">
        <v-avatar title>
          <img v-show="avatarUrl !== ''" :src="avatarUrl" alt="">
          <v-icon v-show="avatarUrl === ''">person</v-icon>
        </v-avatar>
        <span> {{ this.user.name || '######' }} </span>
      </v-card-title>
      <v-card-text>
        {{ post.content }}
      <v-divider></v-divider>

      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!this.user.id && !this.post.id" flat color="orange" @click="openCommentDialog">留言</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="showCommentDialog"
      persistent :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
    <!-- 评论对话框 -->
      <v-card>
        <v-card-text>
         <v-form>
          <v-text-field
            name="comment"
            label="留言"
            multi-line
            v-model="mComment"
            id="id"
          ></v-text-field>
          <v-card-actions>
            <v-btn color="orange" :loading="commenting" @click="submitComment" flat>留言</v-btn>
            <v-btn color="orange" :disabled="commenting" @click="closeCommentDialog" flat>取消</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <comment-list :items="comments" :empty="comments.length === 0">
      <comment-list-item slot-scope="{ item, index }" :comment="item">
      </comment-list-item>

      <v-list-tile slot="empty">暂无留言</v-list-tile>
    </comment-list>
  </v-flex>
</template>

<script>
import CommentList from './CommentList'
import CommentListItem from './CommentListItem'
import CommentData from '../models/CommentData'

export default {
  components: {
    CommentListItem,
    CommentList
  },
  props: {
    postId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      user: {},
      post: {},
      comments: [],
      mComment: '',
      showCommentDialog: false,
      commenting: false
    }
  },
  created () {
    this.$logger.debug('post detail', this.postId)
    this.getPost()
  },
  methods: {
    test () {
      console.log('test')
    },
    commentFails () {

    },
    getPost () {
      this.$client
        .getPost({ id: this.postId })
        .then(r => {
          if (r.status === 200) {
            this.post = r.data.post
            this.comments = r.data.comment.comments
          } else {

          }
        })
    },
    getUserInfo (userId) {
      this.$logger.debug('get user info ' + userId)
      this.$client.getUserInfo({ userId: userId })
        .then(r => {
          this.$logger.debug(r)
          if (r.status === 200) {
            this.user = r.data
          }
        })
    },
    closeCommentDialog () {
      this.mComment = ''
      this.showCommentDialog = false
    },
    openCommentDialog () {
      this.mComment = ''
      this.showCommentDialog = true
    },
    submitComment () {
      this.$logger.debug('postId && userId', this.post.id, this.user.id)
      const comment = CommentData.of(
        this.post.id,
        this.mComment,
        this.user.id)

      this.$logger.debug('submitComment comment', comment)
      this.commenting = true
      this.$client.commentBlog(comment)
        .then(r => {
          if (r.status === 200) {
            this.getPost()
            this.closeCommentDialog()
          } else {
            this.commentFails()
          }
        }).catch(reason => {

        }).finally(() => { this.commenting = false })
    }
  },
  computed: {
    avatarUrl () {
      if (this.user.avatar) {
        return this.$client.getAvatarUrl(this.user.avatar)
      } else {
        return ''
      }
    }
  },
  watch: {
    post (newVal, oldVal) {
      if (newVal.userId) {
        this.getUserInfo(newVal.userId)
      }
    }
  }
}
</script>

<style>

</style>
