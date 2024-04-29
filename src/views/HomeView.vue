
<template>
	<header>
		<HeaderNav></HeaderNav>
	</header>
	<v-data-table
	  :headers="headers"
	  :items="tasks"
	  :sort-by="[{ key: 'hour', order: 'desc' }]"
	>
	  <template v-slot:top>
		<v-toolbar
		  flat
		>
		  <v-toolbar-title>Medicines</v-toolbar-title>
		  <v-divider
			class="mx-4"
			inset
			vertical
		  ></v-divider>
		  <v-spacer></v-spacer>
		  <v-dialog
			v-model="dialog"
			max-width="500px"
		  >
			<template v-slot:activator="{ props }">
			  <v-btn
				class="mb-2"
				color="primary"
				dark
				v-bind="props"
				@click="formTitle = 'New Item';"
			  >
				New
			  </v-btn>
			</template>
			<v-card>
			  <v-card-title>
				<span class="text-h5">{{ formTitle }}</span>
			  </v-card-title>
  
			  <v-card-text>
				<v-container>
				  <v-row>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field
						v-model="editedItem.title"
						label="Medicine name"
						:rules="titleRules"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field
						v-model="editedItem.dosis"
						label="Dosis"
						:rules="dosisRules"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field
						v-model="editedItem.hour"
						label="Hour"
						type="time"
						:rules="hourRules"
					  ></v-text-field>
					</v-col>
				  </v-row>
				</v-container>
			  </v-card-text>
  
			  <v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
				  color="error"
				  variant="text"
				  @click="close"
				>
				  Cancel
				</v-btn>
				<v-btn
				  variant="text"
				  :disabled="validEditedItem"
				  @click="save"
				>
				  Save
				</v-btn>
			  </v-card-actions>
			</v-card>
		  </v-dialog>
		  <v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
			  <v-card-title class="text-h5">Confirm deletion</v-card-title>
			  <v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="text" @click="closeDelete">Cancel</v-btn>
				<v-btn color="error" variant="text" @click="deleteItemConfirm">Delete</v-btn>
				<v-spacer></v-spacer>
			  </v-card-actions>
			</v-card>
		  </v-dialog>
		</v-toolbar>
	  </template>
	  <template v-slot:item.actions="{ item }">
		<v-icon
		  class="me-2"
		  size="small"
		  @click="editItem(item)"
		  icon="mdi-pencil" 
		/>
		<v-icon
		  size="small"
		  @click="deleteItem(item)"
		  color="error"
		  icon="mdi-delete"
		 />
	  </template>
	  <template v-slot:item.is_complete="{ item }">
		
      <v-checkbox
        v-model="item.is_complete"
		@update:modelValue="updateIsComplete(item)"
      ></v-checkbox>
    </template>
	  <template v-slot:no-data>
		<v-btn
		  color="primary"
		  @click="tasksStore.fetchTasks()"
		>
		  Reset
		</v-btn>
	  </template>
	</v-data-table>
  </template>


<script setup>
	// Imports
	import HeaderNav from '@/components/HeaderNav.vue';
	import { ref, computed, watch, onMounted } from 'vue';
	import { useTasksStore } from '@/stores/tasksStore';
	import { useUserStore } from '@/stores/userStore';

	import { storeToRefs } from 'pinia';

	import {z } from "zod";

	// Datos reactivos

	const tasksStore = useTasksStore();
	const { tasks } = storeToRefs(tasksStore)

	const userStore = useUserStore()


	const dialog = ref(false);
	const dialogDelete = ref(false);
	const editedIndex = ref(-1);
	const editedItem = ref({
		title: '',
		dosis: '',
		hour: '',
		id: "",
	});
	const defaultItem = {
		title: undefined,
		dosis: undefined,
		hour: undefined,
	};
	const headers = [
		{ title: 'Name', align: 'start', sortable: true, key: 'title' },
		{ title: 'Dosis', sortable: false, key: 'dosis' },
		{ title: 'Hour', sortable: true, key: 'hour' },
		{ title: 'Actions', key: 'actions', sortable: false },
		{ title: '', key: 'is_complete', sortable: false },
	];

	const formTitle = ref("");

	// Validacion de campos
	const validEditedItem = computed(()=> {
		const schema = z.object({
			title: z.string().min(3, "Minimum 3 characters"),
			dosis: z.string().min(0).refine(value => !!+value, "Must be a valid number greater than 0"),
			hour: z.string().min(0, "Must be a valid hour")
		})

		const shouldDisable = !schema.safeParse(editedItem.value).success
		return  shouldDisable;
	})


	const titleRules = computed(() => {
		const titleSchena = z.string().min(3, "Minimum 3 characters")
		return [
			(value) => {
				const validation = titleSchena.safeParse(value);
				return validation.success || validation.error.issues[0].message;
			}
		]
	})
	const dosisRules = computed(() => {
		const dosisSchena = z.string().min(0).refine(value => !!+value, "Must be a valid number greater than 0")
		return [
			(value) => {
				const validation = dosisSchena.safeParse(value);
				
				return validation.success || validation.error.issues[0].message;
			}
		]
	})
	const hourRules = computed(() => {
		const hourSchena = z.string().min(0, "Must be a valid hour")
		return [
			(value) => {
				const validation = hourSchena.safeParse(value);
				return validation.success || validation.error.issues[0].message;
			}
		]
	})

	// Métodos para manipular UI + API
	const editItem = (item) => {
		formTitle.value = 'Edit Item';
		editedItem.value = { ...item };
		dialog.value = true;
	};

	const itemToBeDeletedID = ref(undefined);
	const deleteItem = async (item) => {
		editedItem.value = { ...item };
		itemToBeDeletedID.value = item.id;
		dialogDelete.value = true;
	};

	const deleteItemConfirm = async () => {
		await tasksStore.deleteExistingTask(itemToBeDeletedID.value);
		itemToBeDeletedID.value = undefined;
		tasksStore.fetchTasks();
		closeDelete();
	};

	const close = () => {
		dialog.value = false;
		editedItem.value = { ...defaultItem };
		editedIndex.value = -1;
	};

	const closeDelete = () => {
		dialogDelete.value = false;
		editedItem.value = { ...defaultItem };
		editedIndex.value = -1;
	};

	const updateIsComplete = async (item) => {
		await tasksStore.editTaskStatus(item.id, item.is_complete);
		tasksStore.fetchTasks();
	}

	const save = async () => {
		const isEditing = formTitle.value === "Edit Item";
		if (!isEditing) {
			await tasksStore.createNewTask({...editedItem.value, id: undefined, is_complete: false, user_id: userStore.user.id});
			tasksStore.fetchTasks();
			return close();
		}

		await tasksStore.editExistingTask(editedItem.value.id, editedItem.value);
		tasksStore.fetchTasks();

		close();
	};

	// Watchers
	watch(dialog, (val) => {
		if (!val) {
			close();
		}
	});

	watch(dialogDelete, (val) => {
		if (!val) {
			closeDelete();
		}
	});

	onMounted(() => {
		tasksStore.fetchTasks()
	})
</script>
