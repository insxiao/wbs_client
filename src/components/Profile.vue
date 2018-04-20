<template>
  <div class="list">
      <div class="profile-list">
          <ProfileListItem :key="idx" :item="item" v-for="(item, idx) in profileProps" />
      </div>
    <div class="clear-data">
      <button class="simple-button" @click="clearDataAndRestart">Log out</button>
    </div>
  </div>
</template>

<script>
import ProfileListItem from './ProfileListItem'

const localStorage = window.localStorage

export default {
  data () {
    return {
      profile_item_order: ['id', 'name', 'gender', 'email', 'birthday'],
      access_modifier: {
        id: {
          editable: false,
          type: Number
        },
        name: {
          editable: true,
          type: String
        },
        gender: {
          editable: true,
          type: String
        },
        email: {
          editable: true,
          type: 'email'
        },
        birthday: {
          editable: true,
          type: Date
        }
      }
    }
  },
  props: ['userdata'],
  computed: {
    currentUser () {
      return this.$appState.getCurrentUser()
    },
    profileProps () {
      console.debug(`this is userdata`, this.computedUserDate)

      return this.profile_item_order.map(key => Object.assign({
        name: key,
        value: this.currentUser[key] }, this.access_modifier[key]))
    }
  },
  methods: {
    clearDataAndRestart () {
      localStorage.clear()
      this.$router.replace('/login')
    },
    getUser () {
      return this.$appState.getCurrentUser()
    }
  },
  components: { ProfileListItem }
}
</script>

<style lang="less" scoped>
@import url("../css/common.less");
.profile-list {
  .scroll-list-box;
  padding: 1rem 1rem 0 1rem;
}

.profile-name {
  font-size: 0.8rem;
}

.profile-value {
  font-size: 3rem;
  overflow-wrap: normal;
}
</style>
