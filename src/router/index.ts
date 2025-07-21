import { createRouter, createWebHistory } from 'vue-router'
import Mainview from '@/views/Mainview.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import OnboardView from '@/views/OnboardView.vue'
import { auth } from '@/middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: 'home',
      component: Mainview,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: OnboardView
    },
    {
      path: "/register",
      name: 'register',
      component: RegisterView,
      
    },
    {
      path: "/login",
      name: 'login',
      component: LoginView,
      
    }
  ],
})

router.beforeEach((to, from, next) => {
  auth(to, from, next)
})

export default router
