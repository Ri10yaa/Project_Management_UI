import { createRouter, createWebHistory } from 'vue-router'
import ManagerForm from '@/components/ManagerForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: ManagerForm
    }
  ],
})

export default router
