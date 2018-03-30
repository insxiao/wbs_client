<template>
  <div id="main">
    <h1>App Main Page</h1>
      <router-view class="view"></router-view>
      <div id="navigator">
        <router-link :to="{ path: '/main/profile', props: { userdata: user } }">Profile</router-link>
        <router-link :to="{ path: '/main/profile', props: { userdata: user } }">Profile</router-link>
      </div>
  </div>
</template>

<script>
const debug = true

export default {
  props: ['user'],
  methods: {
    requireLogin () {
      this.$router.push('/login')
    }
  },
  created () {
    const storage = window.localStorage
    if (debug) {
      storage['user'] = JSON.stringify({
        id: 0,
        name: 'zero',
        gender: 'M',
        email: 'zero@zero.zero'
      })
    }
    const user = JSON.parse(storage['user'])
    console.log(user)
    if (user === undefined || user === null) {
      this.requireLogin()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/common.less');
  #main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .view {
    flex-grow: 1;
  }

  #navigator {
    height: 64px;
    flex-grow: 0;
    display: flex;
    justify-content: space-around;
  }

</style>
