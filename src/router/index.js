import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import TaskCreationView from '@/views/TaskCreationView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'


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
      path: '/taskCreation',
      name: 'TaskCreationView',
      component: TaskCreationView
    },
    {
      path: '/signIn',
      name: 'SignInView',
      component: SignInView
    },
    {
      path: '/signUp',
      name: 'SignUpView',
      component: SignUpView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user === null && to.name !== 'SignUpView' && to.name !== 'SignInView') {
    next({ name: 'SignUpView' })
  } else {
    next()
  }
})

export default router
