
<template>
	<header>
		<HeaderNav></HeaderNav>
	</header>
	<main>
		<h1>Task Creation View!</h1>
		<br><br>
	</main>
	<v-data-table
	  :headers="headers"
	  :items="medicines"
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
						v-model="editedItem.name"
						label="Medicine name"
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
					  ></v-text-field>
					</v-col>
				  </v-row>
				</v-container>
			  </v-card-text>
  
			  <v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
				  color="blue-darken-1"
				  variant="text"
				  @click="close"
				>
				  Cancel
				</v-btn>
				<v-btn
				  color="blue-darken-1"
				  variant="text"
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
				<v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Ok</v-btn>
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
		>
		  mdi-pencil
		</v-icon>
		<v-icon
		  size="small"
		  @click="deleteItem(item)"
		>
		  mdi-delete
		</v-icon>
	  </template>
	  <template v-slot:no-data>
		<v-btn
		  color="primary"
		  @click="initialize"
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



	// Datos reactivos

	const tasksStore = useTasksStore();
	const { tasks } = storeToRefs(tasksStore)

	const userStore = useUserStore()


	const dialog = ref(false);
	const dialogDelete = ref(false);
	const editedIndex = ref(-1);
	const editedItem = ref({
		name: '',
		dosis: '',
		hour: ''
	});
	const defaultItem = {
		name: '',
		dosis: '',
		hour: ''
	};
	const headers = [
		{ title: 'Name', align: 'start', sortable: true, key: 'name' },
		{ title: 'Dosis', sortable: false, key: 'dosis' },
		{ title: 'Hour', sortable: true, key: 'hour' },
		{ title: 'Actions', key: 'actions', sortable: false },
	];

	// Computados
	const formTitle = computed(() => editedIndex.value === -1 ? 'New Item' : 'Edit Item');

	// Datos
	const medicines = ref([]);

	// Inicialización de datos
	const initialize = () => {
		medicines.value = [
			{ name: 'Paracetamol', dosis: '1g', hour: '8:00am'},
			{ name: 'Paracetamol', dosis: '1g', hour: '16:00pm' },
			{ name: 'Paracetamol', dosis: '1g', hour: '00:00am' },
			{ name: 'Ibuprofeno', dosis: '600mg', hour: '8:00am'},
			{ name: 'Ibuprofeno', dosis: '600mg', hour: '16:00pm' },
			{ name: 'Ibuprofeno', dosis: '600mg', hour: '00:00am' },
		];
	};

	initialize();

	// Métodos para manipular UI
	const editItem = (item) => {
		editedIndex.value = medicines.value.indexOf(item);
		editedItem.value = { ...item };
		dialog.value = true;
	};

	const deleteItem = (item) => {
		editedIndex.value = medicines.value.indexOf(item);
		editedItem.value = { ...item };
		dialogDelete.value = true;
	};

	const deleteItemConfirm = () => {
		medicines.value.splice(editedIndex.value, 1);
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

	const save = () => {
		if (editedIndex.value > -1) {
			Object.assign(medicines.value[editedIndex.value], editedItem.value);
		} else {
			medicines.value.push(editedItem.value);
		}
		close();
	};

	// Métodos para manipular la BBDD
	// Pendiente copypaste y reformular


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
</script>
