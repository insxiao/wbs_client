<template>
  <v-app  id="app">
    <div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  #app {
  }
</style>
