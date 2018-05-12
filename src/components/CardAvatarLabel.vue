<template>
    <v-card flat :style="{maxWidth: size + 'px', overflow: 'hidden'}" tile>
      <v-layout column @click="$emit('click-user', user.id)">
        <v-avatar :size="size">
          <img v-if="hasAvatar" :src="avatarUrl" alt="">
          <v-icon v-else>sentiment_very_satisfied</v-icon>
        </v-avatar>
        <v-flex class="wb-avatar-label" v-show="label !== undefined && label !== null">
          <span style="text-overflow: ellipsis">{{ label || user.name }}</span>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
export default {
  name: 'CardAvatarLabel',
  props: {
    user: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    label: {
      default: ''
    },
    size: {
      type: [String, Number],
      default: 48
    }
  },
  computed: {
    hasAvatar () {
      return this.avatarUrl !== ''
    },
    avatarUrl () {
      if (this.user.avatar) {
        return this.$client.getAvatarUrl(this.user.avatar)
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.wb-avatar-label {
  text-align: center;
  text-overflow: ellipsis;
}
</style>
