<template>
  <keep-alive>
    <div id="main">
      <v-toolbar app color="primary">
        <v-avatar v-show="avatarUrl !== ''"
          :size="32"
          color="primary">
          <img :src="avatarUrl" alt="">
        </v-avatar>
        <v-toolbar-title>客户端</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon >refresh</v-icon>
      </v-toolbar>
      <v-content>
        <!-- <v-container fluid fill-height> -->
          <router-view class="view"></router-view>
        <!-- </v-container> -->
      </v-content>
      <v-bottom-nav app :value="true" id="navigator">
        <v-btn :to="{ path: '/main/news', props: { userdata: user } }">
          <font-awesome-icon icon="newspaper" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn :to="{ path: '/main/stars', props: { userdata: user } }">
          <font-awesome-icon icon="star" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn :to="{ path: '/main/search', props: { userdata: user } }">
          <font-awesome-icon icon="search" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn :to="{ path: '/main/profile', props: { userdata: user } }">
          <font-awesome-icon icon="user" size="2x"></font-awesome-icon>
        </v-btn>
      </v-bottom-nav>
    </div>
  </keep-alive>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

const storage = window.localStorage

export default {
  props: ['user', 'active-panel'],
  data () {
    return {
    }
  },
  computed: {
    avatarUrl () {
      const avatar = this.$appState.currentUser.avatar
      if (avatar) {
        return this.$client.getAvatarUrl(this.$appState.currentUser.avatar)
      } else {
        return ''
      }
    }
  },
  methods: {
    requireLogin () {
      this.$router.push('/login')
    }
  },
  created () {
    const userJson = storage['user']
    if (userJson === undefined || userJson === null) {
      this.requireLogin()
      return
    }
    const user = JSON.parse(userJson)
    if (user) { this.$logger.debug(user) }
  },
  watch: {
  },
  components: { FontAwesomeIcon }
}
</script>

<style lang="less" scoped>
@import '../css/color';
  #main {
    // display: flex;
    // flex-direction: column;
  }

  #main h1 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
  }

  .view {
    // border-bottom: @dark-grey solid 1px;
    // flex-grow: 1;
  }

  #navigator {
  }

</style>
