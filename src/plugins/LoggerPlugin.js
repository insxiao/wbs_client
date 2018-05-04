import config from '../config'

var logger = {}

if (config.debug) {
  logger.debug = function () {
    console.log.apply(console, arguments)
  }
} else {
  logger.debug = function () {}
}

logger.log = function () {
  console.log.apply(console, arguments)
}

logger.info = function () {
  console.info.apply(console, arguments)
}

var installed = false

export default {
  install (Vue, options) {
    if (installed) return
    Vue.logger = logger
    Vue.prototype.$logger = logger
    installed = true
  }
}
