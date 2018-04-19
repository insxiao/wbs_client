import api from '../api'
var installed = false
export default function (endpoint) {
  const client = api(endpoint)
  return {
    install (Vue, options) {
      if (installed) return
      Vue.prototype.$client = client
      installed = true
    }
  }
}
