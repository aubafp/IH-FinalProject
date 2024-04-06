<template>
	<v-dialog max-width="500">
		<template v-slot:activator="{ props: activatorProps }">
		<v-btn
			v-bind="activatorProps"
		>Sign Out</v-btn>
		</template>

		<template v-slot:default="{ isActive }">
		<v-card title="Dialog">
			<v-card-text>
			You are going to logout. Do you want to continue?
			</v-card-text>

			<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn
				text="Cancel"
				@click="isActive.value = false"
			></v-btn>
			<v-btn
				text="Continue"
				@click="signOut"
			></v-btn>

			</v-card-actions>
		</v-card>
		</template>
	</v-dialog>
</template>

<script setup>
	import { useUserStore } from '@/stores/userStore'
	import { useRouter } from 'vue-router'

	const userStore = useUserStore()
	const router = useRouter()

	const signOut = async () => {
		try {
			await userStore.signOut();
		router.push({ name: 'SignInView' });
		} catch (error) {
			console.error('Error during sign-out:', error);
		}
	};

</script>

<style scoped>
</style>