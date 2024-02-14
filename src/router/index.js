import {createRouter, createWebHistory} from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import GlobalFeed from '@/views/GlobalFeed.vue'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/create-article',
    name: 'createArticle',
    component: null,
  },
  {
    path: '/settings',
    name: 'settings',
    component: null,
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: null,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
