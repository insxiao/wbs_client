<template>
  <div class="comp">
    <textarea name="post" id="post" placeholder="输入新内容" v-model="content">
    </textarea>
    <button ref="send" class="simple-button submit" @click="post">发送</button>
    <button class="simple-button cancel" @click="$router.back()">取消</button>
  </div>
</template>

<script>
import PostData from '../models/PostData'
export default {
  data () {
    return {
      content: '',
      loading: true
    }
  },
  methods: {
    disableSendButton () {
      this.$refs.send.disabled = true
    },
    enableSendButton () {
      if (!this.$refs.send) return
      this.$refs.send.disabled = false
    },
    post () {
      const loading = this.$loading()
      this.$logger.debug('click post')
      this.disableSendButton()
      const data = new PostData(this.content, this.$appState.currentUser.id)
      this.$client.postBlog(data).then(delay(1)).then(r => {
        const m = this.$message({
          type: 'success',
          message: '发送成功'
        })
        setTimeout(() => m.close(), 1000)
        this.$router.back()
      },
      r => {
        loading.close()
        this.enableSendButton()
        const m = this.$message.error('发送失败')
        setTimeout(() => m.close(), 1000)
      }).finally(() => {
        this.enableSendButton()
        loading.close()
      })
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
  @import url('../css/common.less');
  .comp {
    font-size: 2rem;
    width: 100vw;
    height: 100vh;
    background: rgba(200, 300, 400, 0.5);
    display: flex;
    flex-direction: column;
  }

  #post {
    width: 100vw;
    height: 50vh;
    flex-grow: 1;
    resize: none;
    border-top: none;
    border-left: none;
    border-right: none;

    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }
  }

  .comp .submit {
    text-transform: uppercase;
    &:active {
      transition: border ease-in-out 100ms;
      border: aqua solid 5px;
      border-radius: 5px;
    }
  }

  .simple-button {
    background: white;
    outline: none;
    border: transparent solid 5px;
    border-radius:5px;
    display: block;
    flex-grow: 0;
  }

  .simple-button.submit {
    background: @neon-green;
  }
</style>
