<template>
    <header class="header d-flex justify-content-between align-items-center p-3">
      <h1 style="margin-left: 50px;">{{ title  }}</h1>
      <div class="profile-actions d-flex flex-column align-items-end">
        <button class="btn btn-danger rounded-circle mb-2">
          {{ profileName }}
        </button>
        <button class="btn btn-outline-danger" @click="onLogoutClick">
          Log Out
        </button>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  import { computed, toRefs } from 'vue'
  import { useUserStore } from '../store/userStore';
  import { useRouter } from 'vue-router';

  export default {

    props: {
        title: String
    },

    setup(props) {
        
        const { title } = toRefs(props)
        
        const userStore = useUserStore();
        const router = useRouter();
  
        const onLogoutClick = () => router.push('/');

        const profileName = computed(() => userStore.getProfileName)
        
        return {
            onLogoutClick,
            title,
            profileName
        }

    }
  }
  
  </script>
  
  <style scoped>
  .header {
    background-color: #afbcfa; /* Replace with the actual color code from your design */
  }
  
  /* If you need to override Bootstrap styles, do it here */
  .btn.rounded-circle {
    width: 100px;  /* Adjust the width and height to make the button round */
    height: 100px; /* Adjust the width and height to make the button round */
    padding: 5px;
    border-radius: 50%; /* This will make the button round */
    font-size: 0.8em; /* Adjust font size to fit the button */
  }
  
  .btn.btn-danger {
    background-color: #F26678;
    font-size: 50px; /* Adjust button color */
  }
  
  .btn.btn-outline-danger {
    color: rgb(8, 12, 0); /* Adjust text color */
    border-color: rgb(13, 17, 7);
    background-color: #d1faaf; 
    margin-right: 6%;/* Adjust border color */
  }

  .profile-actions {
    margin-right: 4%;
  }
  </style>
  