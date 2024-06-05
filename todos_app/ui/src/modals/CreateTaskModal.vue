<template>
    <BaseModal modalStyle="show" @handle-close="() => emit('handleClose')">
        <template #modalheader>Create Task</template>
        <template #modalbody>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="task.task">
                </div>
                <div class="mb-3">
                    <label for="assignee" class="form-label">Task Assignee</label>
                    <input type="text" class="form-control" id="assignee" v-model="task.assignee">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" v-model="task.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="status" class="form-label">Status</label>
                    <select class="form-select" id="status" v-model="task.status">
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </form>
        </template>
        <template #modalfooter>
            <button type="button" @click="onSaveChanges" class="btn btn-primary">Save changes</button>
        </template>
    </BaseModal>
</template>
   
<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['saveChanges', 'handleClose'])

const task = ref({
    task: '',
    assignee: '',
    description: '',
    status: ''
})

const onSaveChanges = () => {
    console.log('task  ', task)
    emit("saveChanges", task.value)
    emit("handleClose")
}


</script>