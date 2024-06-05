import { Model } from "mongoose";
import { IUserRepository } from "./user.interface";

export class UserRepository<T> implements IUserRepository<T> {
    
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }
    
    getByEmailAndPassword(email: string, password: string): Promise<T | null> {
        return this.model.findOne({email, password}).exec();
    }

    create(item: T): Promise<T> {
        return this.model.create(item);
    }

}