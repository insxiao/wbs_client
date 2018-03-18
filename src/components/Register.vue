<template>

    <div>
        <div id="container">
            <div class="field-set">
                <div class="row">
                    <label for="username">用户名</label>
                    <input id="username" type="text" :value="username" placeholder="username">
                </div>
                <div class="row">
                    <label for="password">密码</label>
                    <input id="password" type="password" :value="password" placeholder="password">
                </div>
                <div class="row">
                    <label for="pd-check">确认密码</label>
                    <input id="pd-check" type="password" placeholder="password">
                </div>
                <div class="row">
                    <label for="gender" >性别</label>
                    <select name="gender" id="gender">
                        <option value="M">男</option>
                        <option value="F">女</option>
                    </select>
                </div>
                <div class="row">
                    <label for="email">邮件</label>
                    <input id="email" type="email">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      username: 'username',
      password: 'password'
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

    .field-set input {
        .simple-input;
    }

</style>
