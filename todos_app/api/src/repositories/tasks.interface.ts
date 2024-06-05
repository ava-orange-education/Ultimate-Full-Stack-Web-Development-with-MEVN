import { ITask } from "../models/tasks.model";

export interface ITasksRepository<T> {
    
    getAll(): Promise<T[]>;
    
    getById(id: string): Promise<T | null>;
    
    create(item: T): Promise<T>;
    
    update(id: string, item: ITask): Promise<T | null>;
    
    delete(id: string): Promise<boolean>;
}