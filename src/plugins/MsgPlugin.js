let installed = false
export default {
  install (Vue, options) {
    if (!installed) {
      Vue.prototype.$msg = function showMessage (o) {
        let obj
        if (typeof o === 'object') {
          obj = o
        } else {
          obj = {
            message: o
          }
        }
        if (!obj.customClass) { obj.customClass = 'wb-message' }
        if (!obj.duration) { obj.duration = 1000 }
        if (!obj.type) { obj.type = 'info' }

        return this.$message(obj)
      }

      installed = true
    }
  }
}
