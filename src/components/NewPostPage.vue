<template>
  <NewPost fullscreen :value="true" @success="$router.back()" @cancel="$router.back()">
  </NewPost>
</template>

<script>
import NewPost from './NewPost'
export default {
  components: {
    NewPost
  },
  name: 'NewPostPage'
}
</script>

<style scoped>

</style>
