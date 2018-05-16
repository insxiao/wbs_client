<template>
  <v-container id="container">
    <v-snackbar top
      v-model="showSnackMessage"
    >
      {{snackMessage}}
      <v-btn align-end flat color="primary" @click.native="showSnackMessage = false">Close</v-btn>
    </v-snackbar>
      <v-layout class="icon">
        <v-avatar tile align="center" size="128">
          <img :src="icon" />
        </v-avatar>
      </v-layout>
      <div class="field-set">
        <v-text-field
          name="username"
          label="输入用户名"
          :rules="commonRules.name"
          v-model="username"
        ></v-text-field>
        <v-text-field
          name="password"
          :rules="commonRules.password"
          v-model="password"
          type="password"
          label="输入密码"></v-text-field>
        <v-btn block class="field btn-rnd" :loading="isLoading" color="success" @click="login">登录</v-btn>
        <v-btn block :disabled="isLoading" class="field btn-rnd" color="info" @click="register">注册</v-btn>
      </div>
  </v-container>
</template>

<script>
import icon from '../../res/icon/android/ic_launcher.png'
import commonRules from '../Rules'
export default {
  data () {
    return {
      commonRules,
      username: '',
      password: '',
      isLoading: false,
      showSnackMessage: false,
      snackMessage: '',
      icon
    }
  },
  methods: {
    register () {
      this.$logger.log('click register')
      this.$router.push('register')
    },
    showSnack (message) {
      this.snackMessage = message.message || message
      this.showSnackMessage = true
    },
    login () {
      if (this.username.length === 0) {
        this.showSnack('用户名不能为空')
        return
      }
      if (this.password.length === 0) {
        this.showSnack('密码不能为空')
        return
      }
      this.isLoading = true

      this.$client.login(this.username, this.password)
        .then(r => {
          this.$logger.debug('response data ' + r.data)
          if (r.status === 200) {
            this.$appState.currentUser = r.data
            this.$router.push('/main')
          } else {
            this.$logger.debug('response object ' + r)
          }
        }, reason => {
          if (reason.response) {
            this.showSnack('登陆失败，用户名或密码错误')
          } else {
            this.showSnack('网络错误')
          }
          this.$logger.debug('error reason', reason)
        }).then(() => {
          this.isLoading = false
        })
    }
  }
}

</script>

<style scoped lang="less">

</style>
