<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const user = ref('')
const password = ref('')

const signIn = () => {
	userStore.signIn(user.value, password.value)
}
const signUp = () => {
	userStore.signUp(user.value, password.value)
}

</script>

<template>
	<main>
		<h1>Sign In View!</h1>
		<label>
			User:
			<input type="text" v-model="user" />
		</label>
		<label>
			Password:
			<input type="password" v-model="password" />
		</label>

		<v-btn @click="signIn">Sign In</v-btn>

		<br><br>

		<h1>Sign Up View!</h1>
		<label>
			User:
			<input type="text" v-model="user" />
		</label>
		<label>
			Password:
			<input type="password" v-model="password" />
		</label>

		<v-btn @click="signUp">Sign Up</v-btn>


	</main>
</template>

<style scoped>
</style>