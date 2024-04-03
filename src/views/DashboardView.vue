<template>
	<header>
		<NavBar></NavBar>
	</header>
	<main>
		<h1>Home Dashoboard View!</h1>
		<v-btn @click="signOut">Sign Out</v-btn>
	</main>
</template>

<script setup>
	import { useUserStore } from '@/stores/userStore'
	import NavBar from '@/components/NavBar.vue'

	const userStore = useUserStore()

	const signOut = () => {
		userStore.signOut()
	}

</script>

<style scoped>
</style>