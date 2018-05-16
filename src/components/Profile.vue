<template>
  <div class="wb-profile">
    <UserItem @click-user-item="openUserHomepage" :item="$appState.currentUser" :id="-1"></UserItem>
    <v-list>
      <v-subheader>用户注册信息</v-subheader>

      <v-list-tile v-for="(value, key) of userProperties" :key="key">
        <v-list-tile-content>
          {{key}}
        </v-list-tile-content>
        <v-list-tile-content class="align-end">
          <template v-if="key === 'avatar'">
            <v-avatar tile :size="32">
              <img :src="avatarUrl" alt="">
            </v-avatar>
          </template>
          <template v-else> {{ value }} </template>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <div class="clear-data">
      <v-btn depressed block color="error" @click="clearDataAndRestart">Log out</v-btn>
    </div>
  </div>
</template>

<script>
import ProfileListItem from './ProfileListItem'
import UserItem from './UserItem'
const localStorage = window.localStorage

export default {
  data () {
    return {
      profile_item_order: ['id', 'avatar', 'name', 'gender', 'email', 'birthday'],
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
    avatarUrl () {
      return this.$client.getAvatarUrl(this.currentUser.avatar)
    },
    profileProps () {
      console.debug(`this is userdata`, this.computedUserDate)

      return this.profile_item_order.map(key => Object.assign({
        name: key,
        value: this.currentUser[key] }, this.access_modifier[key]))
    },
    userProperties () {
      return this.profile_item_order
        .filter(key => this.currentUser[key])
        .reduce((obj, key) => {
          obj[key] = this.currentUser[key]
          return obj
        }, {})
    }
  },
  methods: {
    clearDataAndRestart () {
      localStorage.clear()
      this.$router.replace('/login')
    },
    openUserHomepage () {
      this.$router.push('/homepage/' + this.$appState.currentUser.id)
    }
  },
  components: {
    ProfileListItem,
    UserItem
  }
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

.wb-profile-logout {
  width:100%;
}
</style>
