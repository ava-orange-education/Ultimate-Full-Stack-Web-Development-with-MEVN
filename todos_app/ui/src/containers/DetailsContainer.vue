<template>
    <div class="container my-4">
      <div class="row mb-4">
        <div class="col">
          <!-- Back to Dashboard button -->
          <button class="btn btn-back" @click="onBackToDashboard">
            ← Back to Dashboard
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col details-section">
          <h2 class="mb-4">Task Details</h2>
          <p class="detail-item"><span class="detail-label">Id:</span> {{ taskDetails.id }}</p>
          <p class="detail-item"><span class="detail-label">Task:</span> {{ taskDetails.task }}</p>
          <p class="detail-item"><span class="detail-label">Description:</span> {{ taskDetails.description }}</p>
          <p class="detail-item"><span class="detail-label">Status:</span> {{ taskDetails.status }}</p>
          <p class="detail-item"><span class="detail-label">Assignee:</span> {{ taskDetails.assignee }}</p>
          <p class="detail-item"><span class="detail-label">Created By:</span> {{ taskDetails.createdBy }}</p>
          <p class="detail-item"><span class="detail-label">Created Date:</span> {{ taskDetails.createdDate }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRouter, useRoute  } from 'vue-router';
  import { useDetailStore } from '../store/detailStore'
  
  const router = useRouter();
  const route = useRoute();
  const detailStore = useDetailStore();

  const onBackToDashboard = () => router.push('/dashboard')

  onMounted(async () => {
    await detailStore.fetchTaskDetails(route.params.id);
  })
  
  const taskDetails = computed(() => {
    const details = detailStore.getTaskDetails;
    return {
      id: details._id,
      task: details.task,
      description: details.description,
      status: details.status,
      assignee: details.assignee,
      createdBy: details.createdBy,
      createdDate: details.createdAt
    }
  })
  
  </script>
  
  <style scoped>
  .btn-back {
    background-color: #FF69B4; /* Hot pink color for the 'Back to Dashboard' button */
    color: white;
    border: none;
    font-size: 1.25rem; /* Bigger text for the button */
    padding: 1rem 1rem; /* Increased padding for the button */
    float: right;
  }
  
  .btn-back:hover {
    background-color: #ff85a2; /* Lighter pink for hover effect */
  }
  
  .details-section {
    background-color: #98FB98; /* Pale green background color */
    border-radius: 0.25rem; /* Rounded corners */
    padding: 2rem; /* Increased padding for the details section */
    font-size: 1.5rem; /* Larger font size for the details */
  }
  
  .detail-item {
    margin-bottom: 1rem; /* More space between detail items */
  }
  
  .detail-label {
    font-weight: bold; /* Bold font for labels */
  }
  </style>
  