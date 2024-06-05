import BaseService from './BaseService';

interface Task {
    _id: number
    task: string;
    assignee: string;
    description: string;
    status: string;
    createdBy?: string;
    updatedBy?: string;
}

class TaskService extends BaseService<Task> {
    
  constructor() {
    super('/api/todos');
  }

  getTasks() {
    return this.get('/tasks');
  }

  getTaskById(id: number) {
    return this.get(`/task/${id}`);
  }

  createTask(task: Task) {
    return this.post('/task', task);
  }

  updateTask(task: Task) {
    return this.put(`/task`, task);
  }

  deleteTask(id: number) {
    return this.delete(`/task/${id}`);
  }
}

export default new TaskService();
