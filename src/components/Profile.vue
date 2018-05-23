<template>
  <div class="wb-profile">
    <UserItem @click-user-item="openUserHomepage" :item="$appState.currentUser" :id="-1"></UserItem>
    <v-list>
      <v-subheader>
        用户注册信息
        <v-spacer></v-spacer>
          <v-icon v-show="false" @click="editUserInfo">edit</v-icon>
      </v-subheader>

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
    <v-list>
      <v-list-tile>
        <v-btn block
               depressed
               @click="showPasswordUpdateDialog = true"
               color="info"><v-icon>edit</v-icon>修改密码</v-btn>
      </v-list-tile>
      <v-list-tile class="clear-data">
        <v-btn
          depressed
          block
          color="error"
          @click="clearDataAndRestart">Log out</v-btn>
      </v-list-tile>
    </v-list>
    <dialog-update-password
      @close="showPasswordUpdateDialog = false"
      @success="logout"
      persistent
      :value="showPasswordUpdateDialog"></dialog-update-password>
  </div>
</template>

<script>
import ProfileListItem from './ProfileListItem'
import UserItem from './UserItem'
import DialogUpdatePassword from './DialogUpdatePassword'

const localStorage = window.localStorage

export default {
  data () {
    return {
      showPasswordUpdateDialog: false,
      editUserInfoDialogVisiable: false,
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
    logout () {
      if (window.localStorage) {
        window.localStorage.clear()
      }
      if (this.$router) {
        this.$router.replace('/login')
      }
    },
    // TODO
    editUserInfo () {
      this.editUserInfoDialogVisiable = true
    },
    closeUserInfoDialog () {
      this.editUserInfoDialogVisiable = false
    },
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
    UserItem,
    DialogUpdatePassword
  }
}
</script>

<style lang="less" scoped>
</style>
