import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
    firstName: String;
    lastName: String;
    email:String;
    password: String;
}

export const userSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }  
    },
    {timestamps: true}
);

export const UserModel: Model<IUser> = model<IUser>("users", userSchema);

