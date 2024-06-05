<template>
  <div class="col-md-11 offset-md-1">
    <!-- Big box in the middle -->
    <div class="task-box d-flex align-items-center justify-content-center">
      <h2>No Tasks Available</h2>
    </div>
  </div>
</template>

<script setup lang="ts">

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
