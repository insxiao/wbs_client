import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

import './css/button.less'
import './css/round-box.less'
Vue.use(VueRouter)

Vue.config.productionTip = false
const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/app',
    component: App
  },
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
