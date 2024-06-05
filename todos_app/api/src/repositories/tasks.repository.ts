import { Model } from "mongoose";
import { ITask } from "../models/tasks.model";
import { ITasksRepository } from "./tasks.interface";

export class TasksRepository<T> implements ITasksRepository<T> {
    
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    create(item: T): Promise<T> {
        return this.model.create(item);
    }

    getAll(): Promise<T[]> {
        return this.model.find({}).exec();
    }

    getById(id: string): Promise<T | null> {
        return this.model.findOne({_id: id});
    }

    update(id: string, item: ITask): Promise<T | null> {
        return this.model.findOneAndUpdate({_id: id}, {...item});
    }
    
    delete(id: string): Promise<any> {
        return this.model.deleteOne({_id: id});
    }

}