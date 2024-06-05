

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { onUnmounted    } from 'vue';

export default {
  setup() {
    onUnmounted   (() => {
      console.log('Component has been unmounted');
    });
  }
};

</script>

