<template>
    <BaseModal :modalStyle="props.modalStyle" @handle-close="() => emit('handleClose')" >
        <template #modalheader>Edit Task</template>
        <template #modalbody>
            <form>
                <div class="mb-3">
                    <label for="taskId" class="form-label">Task ID</label>
                    <input type="text" disabled class="form-control" id="taskId" v-model="task._id">
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" disabled class="form-control" id="name" v-model="task.task">
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
            <button type="button" @click="saveChanges" class="btn btn-primary">Save changes</button>
        </template>
    </BaseModal>
</template>
   
<script setup lang="ts">
import BaseModal from './BaseModal.vue'

const props = defineProps(['modalStyle', 'task'])
const emit = defineEmits(['handleClose', 'editConfirm'])

console.log('props  ', props.task)

const { task }= props

const saveChanges = () => {
    console.log('task  ', props.task);
    emit("editConfirm", props.task)
    emit("handleClose")
}


</script>