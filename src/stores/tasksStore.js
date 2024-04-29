import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks, createTask, editTask, changeStatus, deleteTask } from '@/api/tasksApi'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
  async function fetchTasks() {
    try {
      tasks.value = await fetchAllTasks()
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTask(task) {
    try {
      await createTask(task)
    } catch (error) {
      console.error(error)
    }
  }

  async function editExistingTask(taskId, newValue) {
    try {
      await editTask(taskId, newValue)
    } catch (error) {
      console.error(error)
    }
  }

  async function editTaskStatus(taskId, newStatus) {
    try {
      await changeStatus(taskId, newStatus)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteExistingTask(taskId) {
    try {
      await deleteTask(taskId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks,
    createNewTask,
    editExistingTask,
    editTaskStatus,
    deleteExistingTask
  }
})
