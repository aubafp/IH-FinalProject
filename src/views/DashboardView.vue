<template>
	<header>
		<NavBar></NavBar>
	</header>
	<main>
		<h1>Home Dashoboard View!</h1>
		<span>Tasks: {{ tasks.length }}</span>
		<ul>
			<li v-for="task in tasks" :key="task.id">
				{{ task.title }}
			</li>
		</ul>
		<div>
			<label>
				Task title:
				<input type="textt" v-model="newTaskTitle"/>
			</label>
			<button @click="addTask">Add task</button>
		</div>
	</main>
</template>

<script setup>
	import { useTasksStore } from '@/stores/tasksStore';
	import { storeToRefs } from 'pinia';
	import NavBar from '@/components/HeaderNav.vue'
	import { onMounted, ref } from 'vue';

	const tasksStore = useTasksStore();
	const { tasks } = storeToRefs(tasksStore)

	const newTaskTitle = ref('')

	const addTask = async () => {
		const taskObj = {
			user_id: '4eb99aa9-cf0e-4018-bcf5-6d40ee58e974',
			title: newTaskTitle.value,
			is_complete: false,
		}
		await tasksStore.createNewTask(taskObj);
		tasksStore.fetchTasks();
		newTaskTitle.value = '';
	}

	onMounted( () => {
		tasksStore.fetchTasks();
	})

</script>

<style scoped>
</style>