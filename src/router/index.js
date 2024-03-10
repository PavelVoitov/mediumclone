import {createRouter, createWebHashHistory} from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import GlobalFeed from '@/views/GlobalFeed.vue'
import YourFeed from '@/views/YourFeed.vue'
import TagFeed from '@/views/TagFeed.vue'
import Article from '@/views/Article.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditArticle from '@/views/EditArticle.vue'
import Settings from '@/views/Settings.vue'
import UserProfile from '@/views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
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
    component: Settings,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: UserProfile,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticle,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticle,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
