import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, authExistentUser, logOutFromExistingUser } from '@/api/userApi'

export const useUserStore = defineStore('user', {
  state: () => {
    // State
    const user = ref(undefined)

    // Getters

    // Actions
    async function fetchUser() {
      try {
        user.value = await fetchActualUser()
      } catch (error) {
        if (error.code === '401') {
          user.value = null
          return
        }
      }
    }

    async function signUp(email, password) {
      try {
        await createNewUser(email, password)
      } catch (error) {
        console.error(error)
      }
    }

    async function signIn(email, password) {
      user.value = await authExistentUser(email, password)
    }

    async function signOut() {
      try {
        user.value = await logOutFromExistingUser()
      } catch (error) {
        console.error(error)
      }
    }

    return {
      // State
      user,
      // Getters
      // Actions
      fetchUser,
      signUp,
      signIn,
      signOut
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})