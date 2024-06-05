import { Task } from '../requests/todos.request';
import { TodoResponse } from '../responses/todos.response';
import { TodosService } from '../services/todos.service';

export class TodosController {

    private todosService: TodosService;

    constructor() {
        this.todosService = new TodosService();
    }

    getTasks(): Promise<TodoResponse> {
        console.info('Controller: getTasks', null)
        return this.todosService.getTasks();
    }

    createTask(task: Task): Promise<TodoResponse> {
        console.info('Controller: createTask', task);
        return this.todosService.createTask(task);
    }

    updateTask(task: Task): Promise<TodoResponse> {
        console.info('Controller: updateTask', task);
        return this.todosService.updateTask(task);
    }

    deleteTask(taskId: string): Promise<TodoResponse> {
        console.info('Controller: deleteTask', taskId);
        return this.todosService.deleteTask(taskId);
    }

    getTaskDetails(taskId: string): Promise<TodoResponse> {
        console.info('Controller: getTask Details', null)
        return this.todosService.getTaskDetails(taskId);
    }
}