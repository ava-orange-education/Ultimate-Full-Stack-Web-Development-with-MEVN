<template>
    <div class="col text-end">
        <!-- Button at the top-right -->
        <button class="btn btn-pink mb-3" @click="onCreateTask">
            {{ props.btnName }}
        </button>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const emit = defineEmits(["createTask"])

  const props = defineProps(['btnName'])

  const onCreateTask = () => emit("createTask");

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
  