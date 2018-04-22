<template>
    <div>
        <div id="container">
            <div class="field-set">
                <div class="row">
                  <label for="username">用户名<span class='error-message'>{{ nameError.message }}</span></label>
                    <input @blur="usernameChanged($event, $event.target.value)" id="username" type="text" v-model="username" placeholder="username">
                </div>
                <div class="row">
                  <label for="password">密码<span class='error-message'>{{ passwordError.message }}</span></label>
                    <input @blur="passwordChanged($event, $event.target.value)" id="password" type="password" v-model="password" placeholder="password">
                </div>
                <div class="row">
                  <label for="pd-check">确认密码<span class="error-message">{{ repeatPasswordError.message }}</span></label>
                    <input @blur="repeatPasswordChanged($event, $event.target.value)" id="pd-check" type="password" v-model="repeatPassword" placeholder="password">
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
                <label for="birthday">生日（可选）</label>
                <input id="birthday" type="date" class="birthday-picker" v-model="birthday" />
              </div>
              <div class="btns">
                <button @click="register" class="primary-button simple-button">注册</button>
                <button class="simple-button" @click="returnToLogin">取消</button>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterData from '../models/RegisterData'
class ErrorState {
  constructor (error, message) {
    if (error === undefined) {
      this.error = false
    } else {
      this.error = error
    }
    this.message = message || ''
  }

  show (message) {
    this.error = true
    this.message = message || 'error'
  }

  clear () {
    this.error = false
    this.message = ''
  }
}

export default {
  data () {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      gender: 'M',
      email: '',
      birthday: null,
      usernameErrorMessage: '',
      nameError: new ErrorState(),
      passwordError: new ErrorState(),
      repeatPasswordError: new ErrorState()
    }
  },
  methods: {
    returnToLogin () {
      console.log(this.$router.go(-1))
    },
    showNameError (message) {
      message = message || '用户名输入错误'
      this.nameError.show(message)
    },
    hideNameError () {
      this.nameError.clear()
    },
    showPasswordError (message) {
      this.passwordError.show(message || '密码格式错误')
    },
    hidePasswordError () {
      this.passwordError.clear()
    },
    usernameChanged (event, value) {
      this.hideNameError()
      this.$logger.debug('new username is "' + value + '"')
      if (value.length === 0) {
        this.showNameError('用户名不能为空')
        return false
      }
      if (value.length < 4) {
        this.showNameError('用户名不能少于四位')
        return false
      }
      if (value.length > 8) {
        this.showNameError('用户名不能长于八位')
        return false
      }
      return true
    },
    passwordChanged (event, value) {
      this.$logger.debug('password changed "' + value + '"')
      this.hidePasswordError()
      if (value.length === 0) {
        this.showPasswordError('密码不能为空')
        return false
      }
      if (value.length < 6) {
        this.showPasswordError('密码不能少于六位')
        return false
      }
      return true
    },
    repeatPasswordChanged (event, value) {
      this.$logger.debug('repeat password changed "' + value + '"')
      this.repeatPasswordError.clear()
      if (value.length === 0) {
        this.repeatPasswordError.show('密码不能为空')
        return false
      }
      if (this.password !== this.repeatPassword) {
        this.repeatPasswordError.show('两次输入密码不同')
        return false
      }
      return true
    },
    register () {
      let flag = false
      flag = this.usernameChanged(undefined, this.username)
      flag = this.passwordChanged(undefined, this.password)
      flag = this.repeatPasswordChanged(undefined, this.repeatPassword)
      if (!flag) {
        return
      }
      let birthday
      let email
      if (this.birthday === '') {
        birthday = undefined
      } else {
        birthday = this.birthday
      }

      if (this.email === '') {
        email = undefined
      } else {
        email = this.email
      }

      const rd = new RegisterData(this.username,
        this.password,
        this.gender,
        email,
        birthday)
      const loading = this.$loading()
      this.$client.register(rd)
        .then(r => {
          this.$logger.debug(r.data)
          this.$logger.debug(r)
          if (r.status === 200) {
            this.$logger.debug('register successful')
            const msg = this.$message({
              type: 'success',
              message: '注册成功'
            })
            setTimeout(() => msg.close(), 1000)
            this.$router.back()
          }
        },
        reason => {
          this.$logger.debug('register failed with ' + { reason })
          if (reason.response) {
            const r = reason.response
            if (r.status === 409) {
              const msg = this.$message.error('用户名已存在')
              setTimeout(() => msg.close(), 1000)
            }
          }
        }).finally(() => loading.close())
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

  .error-message {
    color: red;
    float: right;
  }

</style>
