<template>
    <div class="container mt-3">
      <div class="row mb-2">
        <div class="col-md-6">
        <!-- Heading for the Tasks above the table on the left -->
        <h2 class="tasks-heading">Tasks</h2>
      </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table">
            <thead class="table-header-bg">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Created Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="tasks" v-for="(task) in tasks" :key="task.id">
                <th class="task" @click="onRowClick(task._id)" scope="row">{{ task._id }}</th>
                <td>{{ task.task }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.createdAt }}</td>
                <td>
                  <button class="btn btn-edit" @click="onEditTask(task)">Edit</button>
                  <button class="btn btn-delete" @click="onDeleteTask(task)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  const props = defineProps(['tasks'])
  
  const emit = defineEmits(["editTask", "deleteTask", "detailTask"])

  // Sample tasks data
  const tasks = props.tasks;
  
  const onEditTask = (task: any) => {
    // Handle the edit task action
    console.log('Editing task', task);
    emit("editTask", task);
    
  };
  
  const onDeleteTask = (task: any) => {
    // Handle the delete task action
    console.log('Deleting task', task);
    emit("deleteTask", task);
  };

  const onRowClick = (id: number) => emit("detailTask", id);
  </script>
  
  <style scoped>
  .table {
    color: #000;
  }
  
  .table-header-bg th {
    background-color: #ff85a2;
    color: #fff;
  }
  
  .btn-create-task {
    background-color: #ff61a6;
    color: #fff;
    border: none;
  }

  .tasks-heading {
    color: #0e0d0d; /* Color for the 'Tasks' heading, assuming it's the same pink as the 'Create Task' button */
    margin-bottom: 0; /* Remove bottom margin if needed */
  }
  
  .btn-create-task:hover {
    background-color: #ff85a2;
  }
  
  .btn-edit {
    background-color: #ffc107; /* Bootstrap's warning color */
    color: #000;
    border: none;
    margin-right: 15px;
  }
  
  .btn-delete {
    background-color: #dc3545; /* Bootstrap's danger color */
    color: #fff;
    border: none;
  }
  
  .btn-edit:hover {
    background-color: #ffcd39;
  }
  
  .btn-delete:hover {
    background-color: #ff6b81;
  }
  </style>
  