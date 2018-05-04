import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/Main'
import Profile from '@/components/Profile'
import TODO from '@/components/Todo'
import NewPost from '@/components/NewPost'
import Register from '@/components/Register'
import BlogList from '@/components/BlogList'
import Search from '@/components/Search'
import PostItemDetail from '@/components/PostItemDetail'
import UserHome from '@/components/UserHome'

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
      path: '/new',
      component: NewPost
    },
    {
      path: '/homepage/:userId',
      props: true,
      component: UserHome
    },
    {
      path: '/post/:postId',
      props: true,
      component: PostItemDetail
    }
  ]
})
