import { model, Schema, Model, Document } from "mongoose";

export interface ITask extends Document {
    task: String;
    description: String;
    assignee:String;
    status: String;
    createdBy?: string;
    updatedBy?: string;
}

export const tasksSchema: Schema = new Schema(
    {
        task: { type: String, required: true },
        description: { type: String, required: true },
        assignee: { type: String, required: true, unique: true },
        status: { type: String, required: true } ,
        createdBy: { type: String, required: false },
        updatedBy: { type: String, required: false }      
    },
    {timestamps: true}
);

export const TasksModel: Model<ITask> = model<ITask>("tasks", tasksSchema);