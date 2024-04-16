<template>
	<header>
		<div class="wrapper">
			<nav>
				<!-- <RouterLink to="/">Home</RouterLink>
				<RouterLink to="/taskCreation">Create Task</RouterLink> -->
				<SignOut></SignOut>
			</nav>
			
		</div>
	</header>
</template>

<script setup>
// Comp para usar en todas las vistas de home(dashboard) y taskCreatioView para navegar por la aplicacion

// De momento esto está a pincho en App.vue y tiene un bug (probablemente sea algo de css que hay en app.vue, probar a reemplazarlo por un componente de Vuetify): cuando estoy en home me aparece remarcado en verde Create Tasks, y cuando estoy en Create Task me aparece en verde la Home
	import SignOut from '@/components/SignOut.vue'

</script>

<style scoped>
nav {
	display: flex;
	justify-content: flex-end;
	padding: 1rem 2rem;
	
	gap: 20px;
}
</style>