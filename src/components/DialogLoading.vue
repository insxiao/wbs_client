<template>
<v-dialog persistent v-bind="$attrs">
  <v-card>
    <v-card-text>
      <v-btn block :loading="true" flat></v-btn>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'DialogLoading'
}
</script>

<style scoped>

</style>
