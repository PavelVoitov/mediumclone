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
    path: '/feed',
    name: 'yourFeed',
    component: null,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: null,
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
    path: '/settings',
    name: 'settings',
    component: null,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: null,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: null,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: null,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: null,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: null,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
