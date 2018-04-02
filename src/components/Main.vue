<template>
  <div id="main">
    <h1>Weibos</h1>
      <router-view class="view"></router-view>
      <div id="navigator">
        <router-link :to="{ path: '/main/top', props: { userdata: user } }"><i class="far fa-hotjar"></i>Hot</router-link>
        <router-link :to="{ path: '/main/focus', props: { userdata: user } }">Focus</router-link>
        <router-link :to="{ path: '/main/post', props: { userdata: user } }">Add</router-link>
        <router-link :to="{ path: '/main/search', props: { userdata: user } }">Search</router-link>
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
  },
  components: { }
}
</script>

<style lang="less" scoped>
  @import url('../less/fontawesome');
  @import url('../less/fa-regular');
  @import url('../css/common.less');

  #main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  #main h1 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
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
