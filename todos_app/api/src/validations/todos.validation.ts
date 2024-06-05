import Joi from 'joi';

export const updateTaskSchema = Joi.object({
    _id: Joi.string(),
    task: Joi.string().alphanum().min(2).max(30).required(),
    assignee: Joi.string().alphanum().min(2).max(30).required(),
    description: Joi.string().min(2).required(),
    status: Joi.string().alphanum().min(2).required(),
    createdBy: Joi.string().alphanum().min(2),
    updatedBy: Joi.string().alphanum().min(2),
});

export const createTaskSchema = Joi.object({
    _id: Joi.string(),
    task: Joi.string().alphanum().min(2).max(30).required(),
    assignee: Joi.string().alphanum().min(2).max(30).required(),
    description: Joi.string().min(2).required(),
    status: Joi.string().alphanum().min(2).required(),
    createdBy: Joi.string().alphanum().min(2),
    updatedBy: Joi.string().alphanum().min(2)
});