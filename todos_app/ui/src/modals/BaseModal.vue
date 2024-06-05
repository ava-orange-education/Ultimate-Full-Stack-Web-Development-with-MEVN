<template>
   <div class="modal" :class='modalStyle' style="padding-top: 10%;" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <slot name="modalheader"> default header </slot>
                </h5>
                <button type="button" class="close" data-dismiss="modal" @click="closeModal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <slot name="modalbody"> default body </slot>
            </div>
            <div class="modal-footer">
                <slot name="modalfooter"> default Footer </slot>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <style scoped>
  .show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  </style>
  
  <script lang="ts">
  import { onUnmounted, toRefs} from 'vue';
  
  export default {

    props: {
        modalStyle: String
    },

    emits: ['handleClose'],

    setup(props, { emit } ) {
      const { modalStyle } = toRefs(props)

      const closeModal = () => emit('handleClose');
      
      onUnmounted   (() => {
        console.log('Component has been unmounted');
        modalStyle.value = "show"
      });

      return {
        closeModal,
        modalStyle,
        emit
      }
    }
  };
  
  </script>