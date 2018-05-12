import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AppMain from '@/components/Main'
import Profile from '@/components/Profile'
import NewPostPage from '@/components/NewPostPage'
import Register from '@/components/Register'
import BlogList from '@/components/BlogList'
import Search from '@/components/Search'
import PostItemDetail from '@/components/PostItemDetail'
import UserHome from '@/components/UserHome'
import Follow from '@/components/Follow'
import FollowUsers from '@/components/FollowUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/follow',
      component: FollowUsers
    },
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
          component: Follow
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
      component: NewPostPage
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
