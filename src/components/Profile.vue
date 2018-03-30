<template>
  <div class="list">
      <div class="profile-list">
          <ProfileListItem :key="idx" :item="item" v-for="(item, idx) in profileProps" />
      </div>
  </div>
</template>

<script>
import ProfileListItem from './ProfileListItem'

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
    computedUserDate () {
      console.log(this.userdata)
      if (this.userdata === undefined || this.userdata === null) {
        return {
          id: 0xFF,
          name: 'fake name',
          email: 'fake@fake.fake',
          gender: 'unknow',
          birthday: '0000-00-00'
        }
      } else {
        return this.userdata
      }
    },
    profileProps () {
      console.debug(`this is userdata`, this.computedUserDate)

      return this.profile_item_order.map(key => Object.assign({
        name: key,
        value: this.computedUserDate[key] }, this.access_modifier[key]))
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
