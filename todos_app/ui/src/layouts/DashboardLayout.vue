<template>
  <Header title="Tasks Dashboard"></Header>
  <DashboardContainer></DashboardContainer>
</template>

<script setup lang="ts">
import DashboardContainer from '../containers/DashboardContainer.vue';  
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