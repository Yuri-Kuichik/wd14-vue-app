import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

import HomeView from '../pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import PostPage from '@/pages/PostPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // components: {
      //   default: HomeView,
      //   header: AppHeader
      // },
    },
    {
      path: '/about/:id?', // необязательный с помощью модификатора ?
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostPage
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuth();

  if ( !authStore.isAuth()) {
    next({ name: 'login' })
  } 

  // if (to.name !== 'login') {
  //   if ( authStore.isAuth() ) {
  //     next({ name: 'login' })
  //   }
  // } 

  // const authStore = useAuth(); // Используйте Pinia store
  
  next();
});

export default router
