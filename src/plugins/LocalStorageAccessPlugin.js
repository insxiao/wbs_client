var installed = false
export default {
  install (Vue, options) {
    if (installed) return
    Vue.prototype.$storage = window.localStorage
    installed = true
  }
}
