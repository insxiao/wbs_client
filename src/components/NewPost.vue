<template>
  <div class="comp">
    <textarea name="post" id="post" placeholder="输入新内容" v-model="content">
    </textarea>
    <button class="simple-button submit" @click="post">发送</button>
    <button class="simple-button cancel" @click="$router.back()">取消</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    post () {
      console.log('post data', this.content)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/common.less');
  .comp {
    font-size: 2rem;
    width: 100vw;
    height: 100vh;
    background: rgba(200, 300, 400, 0.5);
    display: flex;
    flex-direction: column;
  }

  #post {
    width: 100vw;
    height: 50vh;
    flex-grow: 1;
    resize: none;
    border-top: none;
    border-left: none;
    border-right: none;

    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }
  }

  .comp .submit {
    text-transform: uppercase;
    &:active {
      transition: border ease-in-out 100ms;
      border: aqua solid 5px;
      border-radius: 5px;
    }
  }

  .simple-button {
    background: white;
    outline: none;
    border: transparent solid 5px;
    border-radius:5px;
    display: block;
    flex-grow: 0;
  }

  .simple-button.submit {
    background: @neon-green;
  }
</style>
