import { defineStore } from 'pinia';
import tasksService from '../services/TasksService'

interface TaskState {
    tasks: any;
    loading: boolean;
    status: boolean;
}

export const useTaskStore = defineStore('task', {
  // Define the state as a function that returns the object
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    status: false
  }),
  
  // Add getters for computed properties
  getters: {
    getTasks: (state) => state.tasks,
    isLoading: (state) => state.loading
  },
  
  // Add actions for functions that cause side effects and can involve asynchronous operations
  actions: {
    async fetchTasks() {
        try {
          this.loading = true;
          const response = await tasksService.getTasks()
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.status = true;
            this.tasks = [...this.tasks, ...response.data.result];
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
    },

    async createTask(task: any) {
        try {
          this.loading = true;
          const response = await tasksService.createTask(task)
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.tasks = []
            this.status = true;
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
    },

    async deleteTask(id: any) {
        try {
          this.loading = true;
          const response = await tasksService.deleteTask(id)
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.tasks = []
            this.status = true;
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
    },

    async editTask(task: any) {
        try {
          this.loading = true;
          delete task.createdAt;
          delete task.updatedAt;
          const response = await tasksService.updateTask({_id: task._id, task: task.task, assignee: task.assignee,
             description: task.description, status: task.status})
          this.loading = false;
          if(response.data.result && response.data.statusCode === 200 && response.data.result !== null) {
            this.tasks = []
            this.status = true;
          }
        } catch (error) {
          // Handle the error appropriately.
          console.error('Failed to fetch users:', error);
          this.loading = false;
        }
    }
  },
});
