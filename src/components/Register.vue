<template>

    <div>
        <div id="container">
            <div class="field-set">
                <div class="row">
                    <label for="username">用户名</label>
                    <input id="username" type="text" v-model="username" placeholder="username">
                </div>
                <div class="row">
                    <label for="password">密码</label>
                    <input id="password" type="password" v-model="password" placeholder="password">
                </div>
                <div class="row">
                    <label for="pd-check">确认密码</label>
                    <input id="pd-check" type="password" v-model="repeatPassword" placeholder="password">
                </div>
                <div class="row">
                    <label for="gender" >性别</label>
                    <select name="gender" v-model="gender" id="gender">
                        <option value="M">男</option>
                        <option value="F">女</option>
                    </select>
                </div>
                <div class="row">
                    <label for="email">邮件（可选）</label>
                    <input id="email" v-model="email" type="email">
                </div>
              <div class="row">
                <input type="date" class="birthday-picker" v-model="birthday" />
              </div>
              <div class="btns">
                <button class="primary-button simple-button">注册</button>
                <button class="simple-button" @click="returnToLogin">取消</button>
              </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      gender: 'M',
      email: '',
      birthday: null
    }
  },
  methods: {
    returnToLogin () {
      console.log(this.$router.go(-1))
    }
  }
}
</script>

<style lang="less" scoped>
    @import url("../css/round-box.less");
    @import url("../css/common.less");

    #container {
        width: 80%;
        .auto-side-margin;
        padding: 4rem 0;
    }

    .row {
        width: 100%;
    }

    .row {
        margin: 10px 0;
    }

    .row label {
        .small-font;
        display: block;
        text-align: left;

        &[for=gender] {
            display: inline;
        }
    }

    .row input {
        width: 100%;
        display: inline-block;
    }

    .row .birthday-picker {
      width: 100%;
      .simple-input;
      padding: 0;
      border: @dark-grey solid 1px;
    }

    .field-set input {
        .simple-input;
    }

    .btns {
      display: flex;
      flex-direction: column;
    }

  .simple-button {
    margin: 5px 0;
  }

</style>
