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
				{{ task.is_complete }}
			</li>
		</ul>
		<div>
			<br><br>
			<label>
				Task title:
				<input type="textt" v-model="newTaskTitle"/>
			</label>
			<v-btn @click="addTask">Add task</v-btn>
			<br><br>
			<label>
				Id of task to edit:
				<input type="textt" v-model="idTaskToEdit"/>
			</label>
			<label>
				Edit task title:
				<input type="textt" v-model="titleTaskToEdit"/>
			</label>
			<v-btn @click="editTask">Edit title</v-btn>
			<v-btn @click="editStatus">Edit status</v-btn>
			<v-btn @click="deleteTask">Delete task</v-btn>
		</div>
	</main>
</template>

<script setup>
	import { useTasksStore } from '@/stores/tasksStore';
	import { useUserStore } from '@/stores/userStore';

	import { storeToRefs } from 'pinia';
	import NavBar from '@/components/HeaderNav.vue'
	import { onMounted, ref } from 'vue';

	const tasksStore = useTasksStore();
	const { tasks } = storeToRefs(tasksStore)

	const userStore = useUserStore()

	const newTaskTitle = ref('')

	const idTaskToEdit = ref('')
	const titleTaskToEdit = ref('')

	const addTask = async () => {
		const taskObj = {
			user_id: userStore.user.id,
			title: newTaskTitle.value,
			is_complete: false,
		}
		await tasksStore.createNewTask(taskObj);
		tasksStore.fetchTasks();
		newTaskTitle.value = '';
	}

	const editTask = async () => {
		await tasksStore.editExistingTask(idTaskToEdit.value, titleTaskToEdit.value);
		tasksStore.fetchTasks();
		idTaskToEdit.value = '';
		titleTaskToEdit.value = '';
	}

	const editStatus = async () => {
		await tasksStore.editTaskStatus(idTaskToEdit.value, true);
		tasksStore.fetchTasks();
		idTaskToEdit.value = '';
	}

	const deleteTask = async () => {
		await tasksStore.deleteExistingTask(idTaskToEdit.value);
		tasksStore.fetchTasks();
		idTaskToEdit.value = '';
	}

	onMounted( () => {
		tasksStore.fetchTasks();
	})

</script>

<style scoped>
</style>