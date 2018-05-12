<template>
    <v-dialog :value="true" fullscreen>
      <DialogLoading :value="showAvatarUpload"/>
      <v-card>
        <v-card-title style="text-align: center" primary-title>
          <v-avatar slot="activator" class="wb-register-avatar" :size="64"  @click="$refs.filePicker.click()">
            <img v-show="avatar !== ''" :src="avatarUrl" alt="">
            <v-icon v-show="avatar === ''" large>person_outline </v-icon>
            <input ref="filePicker" @change="fileSelected" style="display: none" type="file" accept="image/jpg, image/jpeg, image/png" name="image"/>
          </v-avatar>
        </v-card-title>
        <v-card-text>
          <v-text-field
            name="username"
            label="用户名"
            v-model.trim="username"
            id="username"
            :rules="commonRules.name"
          ></v-text-field>
          <v-text-field
            name="password"
            label="密码"
            v-model.trim="password"
            :rules="commonRules.password"
            type="password"
            id="password"
          ></v-text-field>
          <v-text-field
            name="repeatPassword"
            label="确认密码"
            :rules="rules.repeatPassword"
            v-model.trim="repeatPassword"
            type="password"
            id="pd-check"
          ></v-text-field>
          <v-select
            :items="genderOptions"
            v-model="gender"
            label="性别"
          ></v-select>
          <v-text-field
            name="email"
            label="电子邮件（可选）"
            type="email"
            v-model="email"
            id="email"
          ></v-text-field>
          <v-text-field
            name="birthday"
            label="生日"
            type="date"
            v-model="birthday"
            id="birthday"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block :loading="registerButtonLoading" color="primary" @click="register" :disabled="disabledRegister">注册</v-btn>
          <v-btn block @click="returnToLogin">取消</v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar
        :timeout="snackbar.timeout"
        top
        v-model="snackbar.value"
        >
        {{ snackbar.message }}
      </v-snackbar>
    </v-dialog>
</template>

<script>
import RegisterData from '../models/RegisterData'
import DialogAvatarUpload from './DialogAvatarUpload'
import DialogLoading from './DialogLoading'
import commonRules from '../Rules'

export default {
  components: {
    DialogLoading,
    DialogAvatarUpload
  },
  data () {
    return {
      avatar: '',
      username: '',
      password: '',
      repeatPassword: '',
      gender: 'M',
      email: '',
      birthday: null,
      showAvatarUpload: false,
      registerButtonLoading: false,
      snackbar: {
        message: '',
        value: false,
        timeout: 1000
      },
      genderOptions: [
        {
          text: '男',
          value: 'M'
        },
        {
          text: '女',
          value: 'F'
        }
      ],
      commonRules,
      rules: {
        repeatPassword: [
          p => (p.length > 0) || '密码不能为空',
          p => (p.length >= 6) || '密码不能少于六位',
          p => (p === this.password) || '两次输入密码不同'
        ]
      }
    }
  },
  computed: {
    disabledRegister () {
      return this.username === '' ||
        this.password === '' ||
        this.repeatPassword === '' ||
        this.password !== this.repeatPassword
    },
    avatarUrl () {
      if (this.avatar) {
        return this.$client.getAvatarUrl(this.avatar)
      } else {
        return ''
      }
    }
  },
  methods: {
    showUploading () {
      this.showAvatarUpload = true
    },
    hideUploading () {
      this.showAvatarUpload = false
    },
    fileSelected () {
      const inp = this.$refs.filePicker
      this.$logger.debug('this should be logged')
      if (inp.files.length > 0) {
        const formData = new FormData()
        formData.append('image', inp.files[0])
        this.$logger.debug(formData)
        this.showAvatarUpload = true
        this.$client.uploadImage(formData)
          .then(r => {
            if (r.status === 200) {
              this.avatar = r.data.uuid
            } else {
              this.$logger.debug(r)
            }
          }).finally(() => {
            this.showAvatarUpload = false
          })
      }
    },
    showSnack (message) {
      this.snackbar.message = message
      this.snackbar.value = true
      setTimeout(() => { this.snackbar.value = false }, this.snackbar.timeout)
    },
    returnToLogin () {
      console.log(this.$router.go(-1))
    },
    register () {
      this.registerButtonLoading = true
      const rd = new RegisterData(this.username,
        this.password,
        this.gender,
        this.avatar,
        this.email,
        this.birthday)
      this.$logger.debug('register with ', rd)
      this.$client.register(rd)
        .then(r => {
          this.$logger.debug(r.data)
          this.$logger.debug(r)
          if (r.status === 200) {
            this.$logger.debug('register successful')
            this.showSnack('注册成功')
            setTimeout(() => this.$router.back(), this.snackbar.timeout)
          }
        },
        reason => {
          this.$logger.debug('register failed with ' + { reason })
          if (reason.response) {
            const r = reason.response
            if (r.status === 409) {
              this.snackbar.value = true
              this.snackbar.message = '用户名已存在'
            }
          }
        }).finally(() => { this.registerButtonLoading = false })
    }
  }
}
</script>

<style lang="less" scoped>

    #container {
        width: 80%;
        padding: 4rem 0;
    }

    .row {
        width: 100%;
        margin: 10px 0;
    }

    .row label {
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
      padding: 0;
    }

    .field-set input {
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

  .wb-register-avatar {
    margin-left: auto;
    margin-right: auto;
    border: solid 1px;
  }
</style>
