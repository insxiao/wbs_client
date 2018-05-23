<template>
  <keep-alive>
    <div id="main">
      <NewPost
        @cancel="showNewPostDialog = false"
        @success="postSuccess"
        :value="showNewPostDialog"></NewPost>
      <v-toolbar app color="primary">
        <v-avatar v-show="avatarUrl !== ''"
          :size="32"
          color="primary">
          <img :src="avatarUrl" alt="">
        </v-avatar>
        <v-toolbar-title>客户端</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-show="showFloatButton"
          :loading="refreshing"
          flat
          icon
          @click="clickedRefresh">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <!-- <v-container fluid fill-height> -->
        <router-view class="view"></router-view>
        <!-- </v-container> -->
      </v-content>
      <v-btn
          @click="showNewPostDialog = true"
          v-show="showFloatButton"
          fab
          right
          small
          style="bottom: 64px"
          color="pink" bottom fixed>
        <v-icon small color="white" style="line-height: 40px">add</v-icon>
      </v-btn>
      <v-bottom-nav app :active.sync="currentPanel" :value="true" id="navigator">
        <v-btn value="news" :to="{ path: '/main/news', props: { userdata: user } }">
          <font-awesome-icon icon="newspaper" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn value="stars" :to="{ path: '/main/stars', props: { userdata: user } }">
          <font-awesome-icon icon="star" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn value="search" :to="{ path: '/main/search', props: { userdata: user } }">
          <font-awesome-icon icon="search" size="2x"></font-awesome-icon>
        </v-btn>
        <v-btn value="profile" :to="{ path: '/main/profile', props: { userdata: user } }">
          <font-awesome-icon icon="user" size="2x"></font-awesome-icon>
        </v-btn>
      </v-bottom-nav>
    </div>
  </keep-alive>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import NewPost from './NewPost'
import EventBus from './EventBus'
const storage = window.localStorage

export default {
  props: ['user', 'active-panel'],
  data () {
    return {
      currentPanel: '',
      showNewPostDialog: false,
      refreshing: false
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
    },
    showFloatButton () {
      return this.currentPanel !== 'profile' &&
        this.currentPanel !== 'search' &&
        this.$route.name !== 'profile' &&
        this.$route.name !== 'search'
    }
  },
  methods: {
    postSuccess () {
      this.showNewPostDialog = false
      EventBus.$emit('e-new-item-post')
    },
    requireLogin () {
      this.$router.push('/login')
    },
    clickedRefresh () {
      this.refreshing = true
      setTimeout(() => { this.refreshing = false }, 1000)
      EventBus.$emit('e-refresh')
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
    currentPanel (oldVal, newVal) {
      this.$logger.debug('current panel', this.currentPanel, oldVal, newVal)
    }
  },
  components: {
    FontAwesomeIcon,
    NewPost
  }
}
</script>

<style lang="less" scoped>
  #main h1 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
  }

</style>
