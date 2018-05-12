import ApiClient from '../rest/ApiClient'

var installed = false

export default {
  install (Vue, options) {
    if (!options.endpoint) {
      throw new Error('missing required endpoint')
    }

    if (installed) return

    const client = new ApiClient(options.endpoint)
    /**
     * @type {ApiClient}
     */
    Vue.prototype.$client = client
    Vue.client = client

    installed = true
  }
}
