import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/Main'
import Profile from '@/components/Profile'
import TODO from '@/components/Todo'
import NewPost from '@/components/NewPost'
import PostItem from '@/components/PostItem'
import Register from '@/components/Register'
import BlogList from '@/components/BlogList'
import Search from '@/components/Search'
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
          component: BlogList
        },
        {
          name: 'stars',
          path: 'stars',
          component: TODO
        },
        {
          name: 'search',
          path: 'search',
          component: Search
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
      component: PostItem,
      props: {
        post: {
          userId: 0,
          id: 2,
          content: 'test item content',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 360).toISOString()
        }
      }
    },
    {
      path: '/test/list',
      component: BlogList
    }
  ]
})
