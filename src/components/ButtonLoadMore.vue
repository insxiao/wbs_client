<template>
  <button v-on="$listeners" class="wb-button">
    <slot></slot>
  </button>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.wb-button {
  font-size: 1rem;
  background: lighten(black, 90%);
  border: none;
  padding: 1rem;
  border-top: fade(black, 50%) solid 1px;

  &:hover {
    background: lighten(black, 80%);
    cursor: pointer;
  }

  &:active {
    background: lighten(black, 20%);
  }
}
</style>
