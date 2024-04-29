<template>
	<h1 class="text-h4">Sign Up</h1>
	<v-sheet class="mx-auto">
	<v-form @submit.prevent>
		<v-text-field
		v-model="user"
		:rules="userRules"
		label="Email"
		></v-text-field>
		<v-text-field
		type="password"
        v-model="password"
        :rules="passRules"
        label="Password"
      ></v-text-field>
	  <v-text-field
	  type="password"
        v-model="confpassword"
        :rules="confPassRules"
        label="Password confirmation"
      ></v-text-field>
		<v-btn @click="signUp" class="mt-2" type="submit" block>Sign Up</v-btn>
	</v-form>
	</v-sheet>
	<p class="text-body-1">Already have an account? <RouterLink to="/signIn">Sign In</RouterLink></p>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import { useUserStore } from '@/stores/userStore'
	import { useRouter } from 'vue-router'


	const user = ref('')
	const password = ref('')
	const confpassword = ref('')


	const userStore = useUserStore()
	const router = useRouter()

	const signUp = async () => {
	try {
		await userStore.signUp(user.value, password.value)
		router.push({
			name: 'MailVerifView',
		})
	} catch (err) {
		console.error(err)
	}
	}

	const userRules = computed(() => {
	return [
		(value) => {
		if (!value) return 'Please type email';
		else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return 'E-mail must be valid'
		return true;
		}
	];
	});

	const passRules = computed(() => {
	return [
		(value) => {
		if (!value) return 'Please type password';
		else if (value.length < 6) return 'Minimum 6 characters'
		return true;
		}
	];
	});

	const confPassRules = computed(() => {
	return [
	(value) => {
		if (!value) return 'Please type password again';
		else if (value !== password.value) return 'The password confirmation does not match'
		return true;
		}
	];
	});
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
</style>