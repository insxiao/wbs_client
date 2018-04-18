import api from './api'
export default function (endpoint) {
  const client = api(endpoint)
  return {
    install (Vue, options) {
      Vue.property.$client = client
    }
  }
}
