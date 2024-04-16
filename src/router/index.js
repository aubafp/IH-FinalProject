import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

import { useUserStore } from '@/stores/userStore'
import MailVerifView from '@/views/MailVerifView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
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
    },
    {
      path: '/mailVerification',
      name: 'MailVerifView',
      component: MailVerifView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const mailVerified = userStore.user?.user?.user_metadata?.email_verified

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user === null && (to.name !== 'SignUpView' && to.name !== 'SignInView' && to.name !== 'MailVerifView')) {
    next({ name: 'SignInView' })
  } else if (userStore.user !== null && (to.name === 'SignUpView' || to.name === 'SignInView' || to.name === 'MailVerifView')) {
    next({ name: 'HomeView' });
  } else {
    next()
  }
})

export default router
