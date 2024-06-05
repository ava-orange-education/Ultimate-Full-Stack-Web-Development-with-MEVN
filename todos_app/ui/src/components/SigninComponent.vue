<template>
    <div class="d-flex justify-content-end align-items-center vh-100" style="background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center; background-size: cover; backdrop-filter: brightness(50%);">
      <div class="card text-center p-4" style="width: 25%; min-height: 70%; max-height: 90%; margin-right: 10%; background-color: rgba(127, 127, 255, 0.95); border: none; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);">
          <h5 class="card-title mb-3 text-white">Sign in</h5>
          <h5 style="color: yellow;">{{ message }}</h5>
          <form @submit.prevent="onSubmit" class="d-flex flex-column justify-content-around h-100">
            <div class="mrgbtm form-floating mb-4">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                v-model="email"
                required
              >
              <label for="email">Email address</label>
            </div>
            <div class="mrgbtm form-floating mb-4">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
                required
              >
              <label for="password">Password</label>
            </div>
            <button type="submit" class="mrgbtm btn btn-lg text-white" style="background-color: #FF00FF; border-radius: 5px;">
                {{ isLoading ? 'Loading..' : 'Log In' }}
            </button>
        </form>
        <div class="mrgbtm">
            <p style="color: white;">Don't have an Account, Singup here</p>
            <button @click="gotoSignup" class="btn btn-lg text-white" style="background-color: #FF00FF; border-radius: 5px;">Sign Up Here</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../store/userStore';
  
  export default defineComponent({
    name: 'SignInComponent',
    setup() {

      const email = ref('');
      const password = ref('');
      const router = useRouter();
      const message = ref('')

      const userStore = useUserStore();
  
      const onSubmit = async () => {
        message.value = '';
        await userStore.signin({ email: email.value, password: password.value })
        if(!userStore.isLoading && userStore.status) {
          console.log(userStore.userProfile)
           router.push('/dashboard');
        } else {
          message.value = "User doesn't exist in the system"
        }
      };

      const isLoading = computed(() => userStore.isLoading);

      const gotoSignup = () => router.push('/signup');
      
  
      return {
        email,
        password,
        onSubmit,
        gotoSignup,
        userStore,
        isLoading,
        message
      };
    }
  });
  </script>
  
  <style scoped>
.mrgbtm {
    margin-top: 12%;
}
  </style>  