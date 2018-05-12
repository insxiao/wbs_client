<template>
  <v-dialog persistent v-bind="$attrs">
    <v-card>
      <v-card-text>
        <v-text-field
          textarea
          name="post"
          id="post"
          placeholder="输入新内容"
          :rules="rules"
          v-model="content">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="content.length === 0"
          flat
          ref="send"
          color="orange"
          :loading="posting"
          @click="post">发送</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="posting"
          flat
          color="orange"
          @click="$emit('cancel')">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PostData from '../models/PostData'
export default {
  inheritAttrs: false,

  data () {
    return {
      content: '',
      posting: false,
      sendDisabled: false,
      rules: [
        v => v.length > 0 || '内容不能为空'
      ]
    }
  },
  methods: {
    post () {
      this.$logger.debug('click post')
      const data = new PostData(this.content, this.$appState.currentUser.id)
      this.$logger.debug('current user is', this.$appState.currentUser)
      this.$logger.debug(data)

      this.posting = true

      this.$client.postBlog(data).then(delay(1)).then(r => {
        this.$msg({
          type: 'success',
          message: '发送成功'
        })
        this.$emit('success')
      },
      r => {
        this.$msg({ message: '发送失败', type: 'error' })
        this.$emit('error')
      }).finally(() => {
        this.posting = false
      })
    }
  },
  watch: {
    posting (newVal, oldVal) {
      this.$logger.debug('posting changed ', oldVal, newVal)
    }
  }
}

function delay (seconds) {
  return function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(value)
      }, seconds * 1000)
    })
  }
}
</script>

<style lang="less" scoped>
</style>
