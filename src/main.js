// The Vue busize="2x"ild version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import config from './config'

import ElementUI from 'element-ui'
import fontawesome from '@fortawesome/fontawesome'
import { faUser, faNewspaper, faStar } from '@fortawesome/fontawesome-free-regular'
import { faSearch, faPlus, faCog } from '@fortawesome/fontawesome-free-solid'
import MsgPlugin from './plugins/MsgPlugin'

import 'element-ui/lib/theme-chalk/index.css'

import './css/common.less'

// plugins
import ClientPlugin from './plugins/ClientPlugin'
import LoggerPlugin from './plugins/LoggerPlugin'
import LocalStorageAccessPlugin from './plugins/LocalStorageAccessPlugin'
import { VuePlugin as AppState } from './StateManager'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ClientPlugin, { endpoint: config.endpoint })
Vue.use(LoggerPlugin)
Vue.use(LocalStorageAccessPlugin)
Vue.use(AppState)

fontawesome.library.add(faUser, faPlus, faSearch, faNewspaper, faStar, faCog)
/* eslint-disable no-new */

Vue.use(MsgPlugin)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// expose Vue to global environment
if (window) {
  window.Vue = Vue
}
