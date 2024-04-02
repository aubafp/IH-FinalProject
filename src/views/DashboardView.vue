<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const signOut = () => {
	userStore.signOut()
}

</script>

<template>
	<main>
		<h1>Home Dashoboard View!</h1>
		<v-btn @click="signOut">Sign Out</v-btn>
	</main>
</template>

<style scoped>
</style>