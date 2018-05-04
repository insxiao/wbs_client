<template>
  <v-dialog
    v-model="value"
    scrollable fullscreen
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
  <v-card>
    <v-text-field
      name="image"
      label="选择图片"
      type="file"
      id="image"
    ></v-text-field>
  </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showUploadDialog: false
    }
  }
}
</script>

<style>

</style>
