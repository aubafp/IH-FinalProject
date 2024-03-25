import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AuthView from '@/views/AuthView.vue'
import TaskCreationView from '@/views/TaskCreationView.vue'

import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashboardView',
      component: DashboardView
    },
    {
      path: '/authentication',
      name: 'AuthView',
      component: AuthView
    },
    {
      path: '/taskCreation',
      name: 'TaskCreationView',
      component: TaskCreationView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user === null && to.name !== 'AuthView') {
    next({ name: 'AuthView' })
  } else {
    next()
  }
})

export default router
