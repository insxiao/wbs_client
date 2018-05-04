<template>
  <div class="comp" @click="back">
    <H1>NotImplemented</H1>
  </div>
</template>

<script>
export default {
  props: ['disableBack'],
  methods: {
    back () {
      if (this.disableBack === true) {
        return
      }

      this.$router.go(-1)
    },
    test () {

    }
  },
  created () {
    this.$logger.debug('create todo')
  }
}
</script>

<style lang="less" scoped>
  .comp h1 {
    display: block;
    margin: auto 0;
  }

</style>
