import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/Main'
import Profile from '@/components/Profile'
import TODO from '@/components/Todo'
import NewPost from '@/components/NewPost'
import PostItem from '@/components/PostItem'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/main',
      component: AppMain,
      children: [
        {
          path: '',
          redirect: 'news'
        },
        {
          name: 'news',
          path: 'news',
          component: TODO
        },
        {
          name: 'stars',
          path: 'stars',
          component: TODO
        },
        {
          name: 'search',
          path: 'search',
          components: {
            default: TODO
          }
        },
        {
          name: 'profile',
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
    },
    {
      path: '/new',
      component: NewPost
    },
    {
      path: '/item',
      component: PostItem
    }
  ]
})
