<template>
    <v-dialog v-bind="$attrs">
      <v-snackbar top
        v-model="msg.show">
        {{ msg.message }}
      </v-snackbar>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="oldPassword"
              type="password"
              :rules="rules.password"
              label="当前密码"></v-text-field>
            <v-text-field
              v-model="newPassword"
              type="password"
              :rules="rules.password"
              label="新密码"></v-text-field>
            <v-text-field
              v-model="checkNewPassword"
              :rules="checkPasswordRules"
              type="password"
              label="确认密码"></v-text-field>
          </v-form>
          <p v-if="msg.message !== ''" style="color: red">{{ msg.message }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="updating"
          @click="updatingPassword"
            flat
            color="orange">修改密码</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('close')"
            flat
            :disabled="updating"
            color="orange">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import Rules from '../Rules'
export default {
  inheritAttrs: false,
  name: 'DialogUpdatePassword',
  data () {
    return {
      rules: Rules,
      oldPassword: '',
      newPassword: '',
      checkNewPassword: '',
      updating: false,
      msg: {
        message: '',
        show: false
      }
    }
  },
  computed: {
    checkPasswordRules () {
      return this.rules.password.concat([
        p => this.newPassword === p || '两次输入密码不相同'
      ])
    }
  },
  methods: {
    showSnack (message) {
      this.msg.message = message
      this.msg.show = true
    },
    updatingPassword () {
      this.updating = true
      this.$client.changePassword({
        id: this.$appState.currentUser.id,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(resp => {
        this.$logger.debug('response for change password', resp)
        if (resp.status === 200) {
          setTimeout(() => this.$emit('success'), 0)
          setTimeout(() => this.$emit('close'), 0)
          this.updating = false
        }
      }, reason => {
        this.$logger.debug('error reason for change password', reason)
        if (reason.response) {
          const resp = reason.response
          const errorMessage = {
            500: '系统内部错误, 请稍后重试',
            401: '请重新登陆后重试',
            400: resp.data.message || '数据错误，请稍后重试'
          }
          this.showSnack(errorMessage[resp.status] || '未知错误')
        } else if (reason.request) {
          this.showSnack('未收到服务器数据')
        } else {
          this.showSnack('未知错误')
        }
      }).finally(() => { this.updating = false })
    }
  }
}
</script>

<style scoped>

</style>
