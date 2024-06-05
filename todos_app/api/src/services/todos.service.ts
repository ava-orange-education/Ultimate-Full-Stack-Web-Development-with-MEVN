import { TodoResponse } from "../responses/todos.response";
import { ITasksRepository } from '../repositories/tasks.interface'
import { TasksRepository } from '../repositories/tasks.repository'
import { ITask, TasksModel } from '../models/tasks.model'
import { LoggerService } from "../logger/api.logger";

export class TodosService {

    private taskRepository: ITasksRepository<ITask>;
    private logger: LoggerService;

    constructor() {
        this.taskRepository = new TasksRepository<ITask>(TasksModel);
        this.logger = new LoggerService();
    }

    async getTasks(): Promise<TodoResponse> {
        this.logger.info(`Service: getTasks`)
        const result = await this.taskRepository.getAll();
        const response: TodoResponse = {
            statusCode: 200,
            result
        }
        return response;
    }

    async createTask(task: any): Promise<TodoResponse> {
        this.logger.info(`Service: createTask, ${task}`);
        const result = await this.taskRepository.create(task);
        const response: TodoResponse = {
            statusCode: 200,
            result
        }
        return response;
    }

    async updateTask(task: any): Promise<TodoResponse> {
        this.logger.info(`Service: updateTask, ${task}`);
        const result = await this.taskRepository.update(task._id, task);
        const response: TodoResponse = {
            statusCode: 200,
            result
        }
        return response;
    }

    async deleteTask(taskId: string): Promise<TodoResponse> {
        this.logger.info(`Service: deleteTask, ${taskId}`);
        const result = await this.taskRepository.delete(taskId);
        const response: TodoResponse = {
            statusCode: 200,
            result
        }
        return response;
    }

    async getTaskDetails(taskId: string): Promise<TodoResponse> {
        console.info(`Service: getTasks, ${taskId}`)
        const taskDetails = await this.taskRepository.getById(taskId);
        const response: TodoResponse = {
            statusCode: 200,
            result: taskDetails
        }
        return response;
    }
}