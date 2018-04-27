<template>
  <div class="search-containre">
    <div class="search-box">
      <input class="simple-input" v-model="text" type="text" name="search-text">
      <div class="search-button">
        <font-awesome-icon id="search-icon" icon="search" color="lightblue" size="2x"/>
      </div>
    </div>
    <simple-list :items="items">
      <template name="header">
      </template>
      <post-item slot-scope="{ item, index }" :item="item" :id="item.id"></post-item>
      <template name="footer">

      </template>
    </simple-list>
  </div>
</template>

<script>
import SimpleList from './SimpleList'
import PostItem from './PostItem'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
  data () {
    return {
      text: '',
      items: []
    }
  },
  methods: {
    search () {
      this.$logger.debug('TODO\t', 'search ()')
    }
  },
  created () {
    this.$logger.debug('create search component')
  },
  components: {
    SimpleList,
    PostItem,
    FontAwesomeIcon
  }
}
</script>

<style lang="less" scoped>
  @import '../css/common';

  .search-box {
    width: 100%;
    position: relative;
    & .simple-input {
      width: 100%;
      padding-right: 48px;
    }

    & .simple-input:focus {
      outline: none;
    }
  }

  .search-button {
    position: absolute;
    top: 0;
    right: 5px;
  }

  #search-icon {
    line-height: 34px;
    transform: scale(0.8);
  }
</style>
