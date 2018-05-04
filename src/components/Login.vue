<template>
  <div id="container">
      <div class="icon-wrapper">
      <div class="icon"></div>
      </div>
      <div class="field-set">
        <v-text-field
          name="input-10-1"
          label="输入用户名"
          v-model="username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="输入密码"></v-text-field>
        <v-btn class="field btn-rnd" color="success" @click="login">登录</v-btn>
        <v-btn class="field btn-rnd" color="info" @click="register">注册</v-btn>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$logger.log('click register')
      this.$router.push('register')
    },
    login () {
      if (this.username.length === 0) {
        this.$msg('用户名不能为空')
        return
      }
      if (this.password.length === 0) {
        this.$msg('密码不能为空')
        return
      }
      const loading = this.$loading()
      this.$client.login(this.username, this.password)
        .then(r => {
          loading.close()
          if (r.status === 200) {
            this.$logger.debug('response data ' + r.data)

            this.$appState.currentUser = r.data
          }
          this.$logger.debug('response object ' + r)
          return {
            status: 'Ok',
            statusCode: 200
          }
        }, reason => {
          loading.close()
          this.$msg({
            message: '登陆失败，用户名或密码错误',
            type: 'error',
            duration: 1000
          })
        }).then(() => {
          this.$router.push('/main')
        })
    }
  }
}
</script>

<style scoped lang="less">
    #container {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .icon-wrapper {
        padding: 2rem;
    }
    .icon {
        margin-left: auto;
        margin-right: auto;
        width: 128px;
        height: 128px;
    }

    .field-set .field  {
        margin-top: .25rem;
        margin-bottom: .23rem;
    }

    .field-set button {
        width: 100%;
        &:first-of-type {
            background-color: red;
            border-color: gray;
        }

    }

    .field-set input {

        width: 100%;
    }
</style>
