import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/AppMain'
import Profile from '@/components/Profile'
import UtilTest from '@/components/UtilTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      component: UtilTest
    },
    {
      path: '/main',
      component: AppMain,
      children: [
        {
          path: 'profile',
          components: {
            default: Profile
          }
        }
      ]
    },
    {
      path: '/profile',
      props: {
        userdata: null
      },
      component: Profile
    }
  ]
})
