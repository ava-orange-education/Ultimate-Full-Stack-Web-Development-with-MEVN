<template>
    <div class="container mt-5">
      <div class="row">
        <CreateTask
         @create-task="() => onCreateTask()"
         :btn-name="computedTasks.length > 0 ? 'Create Task' : 'Create Your First Task'"
        >
        </CreateTask>
      </div>
      <div class="row">
        <NoTasksAvailable v-if="computedTasks.length === 0"></NoTasksAvailable>
        <Tasks 
          v-if="computedTasks.length > 0"
          :tasks="computedTasks"
          @edit-task="(task) => onEditTask(task)"
          @delete-task="(task) => onDeleteTask(task)"
          @detail-task="(id) => onDetailTask(id)"
        >
        </Tasks>
        <DeleteTaskModal 
          :modalStyle="showDeleteModal ? 'show' : 'none'"
          :taskId="deleteTaskId"
          v-if="showDeleteModal"
          @handle-close="() => closeModal('delete')"
          @handle-ok="() => closeModal('delete')"
          @delete-confirm="(taskId) => onDeleteConfirm(taskId)"
        >
        </DeleteTaskModal>
        <EditTaskModal 
          :modalStyle="showEditModal ? 'show' : 'none'"
          :task="editTask"
          v-if="showEditModal"
          @handle-close="() => closeModal('edit')"
          @handle-ok="() => closeModal('edit')"
          @edit-confirm="(task) => onEditConfirm(task)"
        >
        </EditTaskModal>
        <CreateTaskModal
            :modalStyle="showCreateModal ? 'show' : 'none'"
            v-if="showCreateModal"
            @handle-close="() => closeModal('create')"
            @handle-ok="() => closeModal('create')"
            @save-changes="(task: any) => onSaveTask(task)"
        >
        </CreateTaskModal>
        
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/taskStore'
import NoTasksAvailable from '../components/NoTasksAvailable.vue'
import Tasks from '../components/Tasks.vue'
import CreateTask from '../components/CreateTask.vue'
import DeleteTaskModal from '../modals/DeleteTaskModal.vue'
import EditTaskModal from '../modals/EditTaskModal.vue'
import CreateTaskModal from '../modals/CreateTaskModal.vue'

 const router = useRouter()
 const taskStore = useTaskStore();

 const showEditModal = ref(false);
 const showDeleteModal = ref(false)
 const showCreateModal = ref(false)
 const deleteTaskId = ref(null);
 const editTask = ref(null);
 
 const computedTasks = computed(() => taskStore.getTasks);

 onMounted(async () => {
    await taskStore.fetchTasks();
 })

 const closeModal = (modalType: string) => {
    if(modalType === 'delete') {
      showDeleteModal.value = false; 
    } else if(modalType === 'edit') {
      showEditModal.value = false; 
    } else if(modalType === 'create') {
      showCreateModal.value = false; 
    }
 };
 
 const onEditTask = (task: any) => {
    console.log('onEdit', task)
    showEditModal.value = true;
    editTask.value = {...task};
 }

 const onSaveTask = async (task: any) => {
    console.log('task  ', task)
    await taskStore.createTask(task);

    if(!taskStore.isLoading && taskStore.status) {
      await taskStore.fetchTasks();
    }
 }

 const onDeleteTask = async (task: any) => {
    console.log('onDelete', task);
    showDeleteModal.value = true;
    deleteTaskId.value = task._id
 }

 const onDeleteConfirm = async (taskId: any) => {
  await taskStore.deleteTask(taskId);

  if(!taskStore.isLoading && taskStore.status) {
    await taskStore.fetchTasks();
  }
 }

 const onEditConfirm = async (task: any) => {

    await taskStore.editTask(task);

    if(!taskStore.isLoading && taskStore.status) {
      await taskStore.fetchTasks();
    }
 }

 const onDetailTask = (id: number) => router.push(`${id}/detail`)

 const onCreateTask = () => showCreateModal.value = true;

</script>
  
  <style scoped>
  .task-box {
    height: 500px; /* Adjust height as needed */
    background-color: #6C757D; /* Dark gray background */
    color: white; /* White text color */
    margin-bottom: 20px;
    border-radius: 0.25rem; /* Slight rounding of corners to match Bootstrap's style */
  }
  
  .btn-pink {
    background-color: #E83E8C; /* Pink background color */
    color: white; /* White text color */
    border: none; /* No border */
    padding: 15px;
  }
  
  .btn-pink:hover {
    background-color: #ff577f; /* Lighter pink for hover effect */
  }
  </style>
  