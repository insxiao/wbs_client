<template>
  <keep-alive>
    <div id="main">
        <router-view class="view"></router-view>
        <div id="navigator">
          <router-link :class="{'active-panel': fNews}" @click.native="switchTo(NEWS)" :to="{ path: '/main/news', props: { userdata: user } }">
            <font-awesome-icon icon="newspaper" size="2x"></font-awesome-icon>
          </router-link>
          <router-link :class="{'active-panel': fStars }" @click.native="switchTo(STARS)" :to="{ path: '/main/stars', props: { userdata: user } }">
            <font-awesome-icon icon="star" size="2x"></font-awesome-icon>
          </router-link>
          <router-link :class="{'active-panel': fPost }" :to="{ path: '/new', props: { userdata: user } }">
            <font-awesome-icon icon="plus" size="2x"></font-awesome-icon>
          </router-link>
          <router-link :class="{'active-panel': fSearch }" @click.native="switchTo(SEARCH)" :to="{ path: '/main/search', props: { userdata: user } }">
            <font-awesome-icon icon="search" size="2x"></font-awesome-icon>
          </router-link>
          <router-link :class="{'active-panel': fProfile }" @click.native="switchTo(PROFILE)" :to="{ path: '/main/profile', props: { userdata: user } }">
            <font-awesome-icon icon="user" size="2x"></font-awesome-icon>
          </router-link>
        </div>
    </div>
  </keep-alive>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

const storage = window.localStorage

const NEWS = 'news'
const STARS = 'stars'
const POST = 'post'
const SEARCH = 'search'
const PROFILE = 'profile'
const getCurrentPanelName = () => storage['currentPanel'] || 'news'

export default {
  props: ['user', 'active-panel'],
  data () {
    var fNews = false
    var fStars = false
    var fPost = false
    var fSearch = false
    var fProfile = false
    switch (getCurrentPanelName()) {
      case NEWS: fNews = true; break
      case STARS: fStars = true; break
      case POST: fPost = true; break
      case SEARCH: fSearch = true; break
      case PROFILE: fProfile = true; break
    }
    return {
      fNews,
      fStars,
      fPost,
      fSearch,
      fProfile,
      NEWS,
      STARS,
      POST,
      SEARCH,
      PROFILE,
      currentPanel: NEWS
    }
  },
  computed: {

  },
  methods: {
    activeNews () { this.fNews = true },
    activeStars () { this.fStars = true },
    activePost () { this.fPost = true },
    activeSearch () { this.fSearch = true },
    activeProfile () { this.fProfile = true },
    getCurrentPanel () {
      const name = storage['currentPanel']
      return name
    },
    requireLogin () {
      this.$router.push('/login')
    },
    switchTo (panel) {
      const to = (pl) => {
        storage['currentPanel'] = pl
      }
      const clearFlags = () => {
        this.fNews = false
        this.fStars = false
        this.fPost = false
        this.fSearch = false
        this.fProfile = false
      }
      switch (panel) {
        case NEWS: to(NEWS)
          clearFlags()
          this.activeNews()
          break
        case STARS: to(STARS)
          clearFlags()
          this.activeStars()
          break
        case POST: to(POST)
          clearFlags()
          this.activePost()
          break
        case SEARCH: to(SEARCH)
          clearFlags()
          this.activeSearch()
          break
        case PROFILE: to(PROFILE)
          clearFlags()
          this.activeProfile()
          break
        default:
          throw new Error(`unexpected value ${panel}`)
      }
    }
  },
  created () {
    if (!this.getCurrentPanel()) {
      this.switchTo(this.NEWS)
    }
    const userJson = storage['user']
    if (userJson === undefined || userJson === null) {
      this.requireLogin()
      return
    }
    const user = JSON.parse(userJson)
    if (user) { this.$logger.debug(user) }
  },
  watch: {
    '$route' (to, from) {
      switch (to.name) {
        case 'news': this.switchTo(NEWS)
          break
        case 'stars': this.switchTo(STARS)
          break
        case 'search': this.switchTo(SEARCH)
          break
        case 'profile': this.switchTo(PROFILE)
          break
      }
    }
  },
  components: { FontAwesomeIcon }
}
</script>

<style lang="less" scoped>
  @import url('../css/common.less');

  #main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #main a {
    width: 60px;
    height: 60px;
    padding: 12px;
    color: @dark-grey;

    &:visited {
      color: @dark-grey;
    }
  }

  #main h1 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
  }

  .view {
    border-bottom: @dark-grey solid 1px;
    flex-grow: 1;
  }

  #navigator {
    min-height: 64px;
    flex-grow: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

</style>
