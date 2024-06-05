import { defineStore } from 'pinia';
import userService, { User } from '../services/UserService';

interface UserState {
    userProfile: {firstName?: string, lastName?: string, email?: string, password?: string};
    loading: boolean;
    status: boolean;
}

export const useUserStore = defineStore('user', {
  // Define the state as a function that returns the object
  state: (): UserState => ({
    userProfile: {},
    loading: false,
    status: false
  }),

  persist: true,
  
  // Add getters for computed properties
  getters: {
    getUserProfile: (state) => state.userProfile,
    isLoading: (state) => state.loading,
    getProfileName: (state) => `${state.userProfile?.firstName?.charAt(0).toUpperCase()}${state.userProfile?.lastName?.charAt(0).toUpperCase()}`
  },
  
  // Add actions for functions that cause side effects and can involve asynchronous operations
  actions: {
    async signin(userData: User) {
        try {
          this.loading = true;
          const response = await userService.signin(userData);
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.status = true;
            this.userProfile = response.data.result;
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
      },
  
      async createUser(userData: User) {
        try {
          this.loading = true;
          const response = await userService.signup(userData);
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.status = true;
            this.userProfile = response.data.result;
          }
        } catch (error) {
          console.error('Failed to create user:', error);
          this.loading = false;
        }
      },
  },
});
