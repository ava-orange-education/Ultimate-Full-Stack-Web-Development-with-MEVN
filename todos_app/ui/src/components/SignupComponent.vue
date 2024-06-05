<template>
    <div class="d-flex justify-content-end align-items-center vh-100" style="background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center; background-size: cover; backdrop-filter: brightness(50%);">
      <div class="card text-center p-4" style="width: 25%; min-height: 70%; max-height: 90%; margin-right: 10%; background-color: rgba(127, 127, 255, 0.95); border: none; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);">
          <h5 class="card-title mb-3 text-white">Sign Up For Free</h5>
          <h5 style="color: yellow;">{{ message }}</h5>
          <form @submit.prevent="onSubmit" class="d-flex flex-column justify-content-around h-100">
            <div class="mrgbtm form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="firstname"
                placeholder="first name"
                v-model="firstName"
                required
              >
              <label for="email">First Name</label>
            </div>
            <div class="mrgbtm form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="lastname"
                placeholder="last name"
                v-model="lastName"
                required
              >
              <label for="email">Last Name</label>
            </div>
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
            <div class="mrgbtm form-floating mb-4">
              <input
                type="password"
                class="form-control"
                id="verifypassword"
                placeholder="Verify Password"
                v-model="verifypassword"
                required
              >
              <label for="verifypassword">Verify Password</label>
            </div>
            <button type="submit" class="mrgbtm btn btn-lg text-white" style="background-color: #FF00FF; border-radius: 5px;">
              {{ isLoading ? 'Loading..' : 'Create Your Account' }}  
            </button>
          </form>
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
      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');
      const password = ref('');
      const verifypassword = ref('');
      const message = ref('')

      const router = useRouter();
      const userStore = useUserStore();
  
      const onSubmit = async () => {
        message.value = '';
        await userStore.createUser({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value })
        console.log(userStore)
        if(!userStore.isLoading && userStore.status) {
           router.push('/dashboard');
        } else {
          message.value = "Not able to create account!"
        }
      };

      const isLoading = computed(() => userStore.isLoading);
  
      return {
        firstName,
        lastName,
        email,
        password,
        verifypassword,
        onSubmit,
        message,
        isLoading
      };
    }
  });
  </script>
  
  <style scoped>
.mrgbtm {
    margin-top: 5%;
}
  </style>  