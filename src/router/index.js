import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/Main'
import Profile from '@/components/Profile'
import TODO from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      component: AppMain,
      children: [
        {
          path: '',
          props: {
            disableBack: true
          },
          component: TODO
        },
        {
          path: 'search',
          components: {
            default: TODO
          }
        },
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
    },
    {
      path: '/todo',
      component: TODO
    }
  ]
})
