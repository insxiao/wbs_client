<template>
  <div>
    <div v-if="users.length > 0">
      <v-layout column tile>
        <v-subheader>
          当前关注用户
        </v-subheader>
        <v-layout class="wb-follow-list" row>
          <CardAvatarLabel @click-user="$emit('click-user', $event)" class="wb-follow-list-item"
                           :size="48"
                           :user="user"
                           :key="index"
                           v-for="(user, index) in users"
                           flat>
          </CardAvatarLabel>
        </v-layout>
      </v-layout>
    </div>
    <div v-else>
      <v-card flat>
        <v-card-title>
          <v-icon>!</v-icon>
          <span class=".title">
          当前无关注用户
          </span>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import CardAvatarLabel from './CardAvatarLabel'
import PostItem from './PostItem'
export default {
  name: 'FollowUsers',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  components: {
    CardAvatarLabel,
    PostItem
  },
  methods: {
  },
  computed: {
  },
  created () {

  }
}
</script>

<style scoped>
  .wb-follow-list {
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    width: 100%;
  }
  .wb-follow-list-item {
    flex-shrink: 0;
    margin: .25rem;
  }
</style>
