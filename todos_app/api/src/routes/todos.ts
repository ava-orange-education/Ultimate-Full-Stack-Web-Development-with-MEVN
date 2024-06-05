import express from "express";
import { TodosController } from '../controllers/todos.controller'
import { CreateTaskRequest, UpdateTaskRequest } from '../requests/todos.request'
import { TodoResponse } from '../responses/todos.response'
import { createTaskSchema, updateTaskSchema } from '../validations/todos.validation'
import { LoggerService } from "../logger/api.logger";

class Todos {

    public express: express.Application;
    private todosController: TodosController;
    private logger: LoggerService;

    constructor() {
        this.express = express();
        this.routes();
        this.todosController = new TodosController();
        this.logger = new LoggerService();
    }

    private routes(): void {

        // GET Tasks
        this.express.get("/tasks", async (req: express.Request<any, any>, 
            res: express.Response<TodoResponse>, next: express.NextFunction) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.getTasks();
            res.status(200).json(result);
        });

        // PUT Task
        this.express.put("/task", async (req: express.Request<any, any, UpdateTaskRequest>, 
            res: express.Response<TodoResponse>, next: express.NextFunction) => {
            
            const { error, value } = updateTaskSchema.validate(req.body);

            if (error) {
              res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
              return;
            }

            const result = await this.todosController.updateTask(req.body);
            res.status(200).json(result);
        });

        // POST Task
        this.express.post("/task", async (req: express.Request<any, any, CreateTaskRequest>, 
            res: express.Response<TodoResponse>, next: express.NextFunction) => {
            
            const { error, value } = createTaskSchema.validate(req.body);

            if (error) {
              res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
              return;
            }

            const result = await this.todosController.createTask(req.body);
            res.status(200).json(result);
        });

        // DELETE Task
        this.express.delete("/task/:id", async (req: express.Request<any, any>, 
            res: express.Response<TodoResponse>, next: express.NextFunction) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.deleteTask(req.params.id);
            res.status(200).json(result);
        });

        // GET Task detail
        this.express.get("/task/:id", async (req: express.Request<any, any>, 
            res: express.Response<TodoResponse>, next: express.NextFunction) => {
            this.logger.info("url:::::::" + req.url);
            const result = await this.todosController.getTaskDetails(req.params.id);
            res.status(200).json(result);
        });
    }
}

export default new Todos().express;