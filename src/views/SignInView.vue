<template>
  <h1 class="text-h4">Sign In</h1>
  <v-sheet class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field v-model="user" :rules="rules" label="Email"></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        :rules="rules"
        label="Password"
      ></v-text-field>
      <v-btn @click="signIn" class="mt-2" type="submit" block>Sign In</v-btn>
    </v-form>
  </v-sheet>
  <p class="text-body-1">Do not have an account?<RouterLink to="/signUp">Sign Up</RouterLink></p>
  <v-alert v-if="errorMsj" title="Sign In Error" type="error">{{
    errorMsj
  }}</v-alert>
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
		name: 'DashboardView',
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