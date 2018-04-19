<template>
  <div id="container">
      <div class="icon-wrapper">
      <div class="icon"></div>
      </div>
      <div class="field-set">
        <input class="field" type="text" v-model="username" placeholder="username">
        <input class="field" type="password" v-model="password" placeholder="password">
        <button class="field btn-rnd" @click="login">登录</button>
        <button class="field btn-rnd" @click="register">注册</button>
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
    echo () {
      console.log('hello')
    },
    login () {
      const router = this.$router
      this.$client.login(this.username, this.password)
        .then(r => {
          if (r.status === 200) {
            console.debug('login success')
            this.$logger.debug(r.data)
          }
          this.$logger.debug(r)
          return {
            status: 'Ok',
            statusCode: 200
          }
        }, reason => {
          console.log('login failed')
          console.log(reason)
        })
    },
    fetchUserInfo (id) {
      return this.$client.getUserInfo(id)
    }
  }
}
</script>

<style scoped lang="less">
    @import url("../css/common.less");

    #container {
        width: 80%;
        .auto-side-margin;
    }

    .icon-wrapper {
        padding: 2rem;
    }
    .icon {
        .auto-side-margin;
        width: 128px;
        height: 128px;
    }

    .field-set .field  {
        margin-top: .25rem;
        margin-bottom: .23rem;
    }

    .field-set button {
        .simple-button;
        display: block;
        width: 100%;
        height: 100%;
        &:first-of-type {
            background-color: @main-color;
            border-color: @second-color;
        }

    }

    .field-set input {
        .simple-input;
        width: 100%;
    }
</style>
