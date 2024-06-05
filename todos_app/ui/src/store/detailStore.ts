import { defineStore } from 'pinia';
import tasksService from '../services/TasksService'

interface TaskState {
    taskDetails: any;
    loading: boolean;
    status: boolean;
}

export const useDetailStore = defineStore('task-detail', {
  // Define the state as a function that returns the object
  state: (): TaskState => ({
    taskDetails: {},
    loading: false,
    status: false
  }),
  
  // Add getters for computed properties
  getters: {
    getTaskDetails: (state) => state.taskDetails,
    isLoading: (state) => state.loading
  },
  
  // Add actions for functions that cause side effects and can involve asynchronous operations
  actions: {
    async fetchTaskDetails(id: any) {
        try {
          this.loading = true;
          const response = await tasksService.getTaskById(id)
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.status = true;
            this.taskDetails = response.data.result;
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
      }
  },
});
