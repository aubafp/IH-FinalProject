<template>
	<header>
		<nav>
			<v-icon icon="mdi-pill" color="primary"/>
			AubaHack!
			<div class="end">
				<SignOut ></SignOut>
			</div>
		</nav>
		<div class="container">
			{{new Date().toLocaleString().split(",")[0]}}
		</div>
	</header>
</template>

<script setup>
import SignOut from '@/components/SignOut.vue'

</script>

<style scoped>
nav {
	font-size: 120%;
	display: flex;
	align-items: center;
	padding: 2rem 2rem 0rem;

	gap: 0.5rem
}
.end {
	margin-left: auto;
}
.container {
	padding: 0.5rem 2rem 1rem;
	font-size: 90%;
}
</style>