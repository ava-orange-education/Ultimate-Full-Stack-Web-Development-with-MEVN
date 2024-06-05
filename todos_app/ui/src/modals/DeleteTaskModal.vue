<template>
    <BaseModal :modalStyle="props.modalStyle" @handle-close="() => emit('handleClose')">
        <template #modalheader>Delete Task</template>
        <template #modalbody>Task {{ taskId }} Has been Deleted!!!</template>
        <template #modalfooter>
            <button type="button" class="btn btn-secondary" @click="onOk" data-dismiss="modal">Ok</button>
        </template>
    </BaseModal>
</template>
   
<script setup lang="ts">
import BaseModal from './BaseModal.vue'

const props = defineProps(['modalStyle', 'taskId'])

const emit = defineEmits(['handleClose', 'deleteConfirm'])

const onOk = () => {
    emit("deleteConfirm", props?.taskId)
    emit("handleClose")
}

</script>