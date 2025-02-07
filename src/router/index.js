import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

import HomeView from '../pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'

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
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuth();

  if (to.name !== 'login') {
    if ( !authStore.accessToken ) {
      next({ name: 'login' })
    }
  } 

  // const authStore = useAuth(); // Используйте Pinia store
  console.log(to)
  console.log(from)
  console.log(authStore);
  
  next();
});

export default router
