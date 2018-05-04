<template>
  <button class="wb-round-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import '../css/common';

.wb-round-button {
  box-sizing: border-box;
  border: darken(@primary-color, 10%) solid 1px;
  background: @primary-color;
  padding: .2rem 1rem;
  border-radius: 1rem;
  transition: background ease-in-out .1s;
  &:hover {
    background: darken(@primary-color, 10%);
  }

  &:focus {
    outline: none;
  }
}
</style>
