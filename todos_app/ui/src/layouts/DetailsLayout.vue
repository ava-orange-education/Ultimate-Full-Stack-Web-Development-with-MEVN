<template>
    <Header title="Task Details"></Header>
    <DetailsContainer></DetailsContainer>
  </template>
  
  <script setup lang="ts">
  import DetailsContainer from '../containers/DetailsContainer.vue';  
  import Header from '../components/Header.vue'
  </script>
  
  <style scoped>
  .layout {
    font-weight: bold;
    background-color: red;
    color: black;
    padding: 3%;
  }
  </style>