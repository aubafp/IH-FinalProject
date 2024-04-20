<template>
  <section>
    <h1 class="text-h4">Forgot Password</h1>
    <h2 style="text-align: center;">TODO</h2>
    
</section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const user = ref('')
const password = ref('')
const errorMsj = ref(undefined)

const userStore = useUserStore()
const router = useRouter()

const signIn = async () => {
  try {
	await userStore.signIn(user.value, password.value)
	router.push({
		name: 'HomeView',
  	})
  } catch (err) {
	console.error(err)
	errorMsj.value = err
  }
}

const rules = computed(() => {
  return [
    (value) => {
      if (value) return true
      return 'You must enter a value'
    }
  ]
})
</script>

<style scoped>
.v-sheet {
  width: 300px;
}
h1 {
  margin-top: 50px;
  text-align: center;
  margin-bottom: 40px;
}
.v-btn {
  margin-bottom: 30px;
}
p {
  text-align: center;
}
.v-alert {
  margin-top: 40px;
}
</style>