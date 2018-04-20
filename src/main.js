// The Vue busize="2x"ild version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import fontawesome from '@fortawesome/fontawesome'
import { faUser, faNewspaper, faStar } from '@fortawesome/fontawesome-free-regular'
import { faSearch, faPlus } from '@fortawesome/fontawesome-free-solid'

import 'element-ui/lib/theme-chalk/index.css'

// plugins
import buildClient from './plugins/ClientPlugin'
import Logger from './plugins/LoggerPlugin'
import LocalStorageAccessPlugin from './plugins/LocalStorageAccessPlugin'
import { VuePlugin as StatePlugin } from './StateManager'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(buildClient('http://localhost:9000'))
Vue.use(Logger)
Vue.use(LocalStorageAccessPlugin)
Vue.use(StatePlugin)

fontawesome.library.add(faUser, faPlus, faSearch, faNewspaper, faStar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
