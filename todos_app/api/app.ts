import * as bodyParser from "body-parser";
import express from "express";
import User from './src/routes/user';
import todos from './src/routes/todos';
import { LoggerService } from "./src/logger/api.logger";
import path from 'path';
import rateLimit from 'express-rate-limit';
import { globalErrorHandler } from './src/config/globalErrorHandler';

class App {

    public express: express.Application;
    private logger: LoggerService

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        
        this.logger = new LoggerService();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // Serve static assets from the 'dist' directory
        this.express.use(express.static(path.join(process.cwd(), './ui/dist')));
    }

    private routes(): void {
        /*this.express.get("/", (req, res, next) => {
            res.status(200).send("<h1> API Works !!!</h1>");
        });*/

        this.express.use('/api/user', User);
        this.express.use('/api/todos', todos);

        // All other routes should redirect to the index.html
        this.express.use("*", (req, res, next) => {
            //this.logger.debug('Handling unhandled route ${req.path}')
            //res.status(404).send("<h1 style='color:red'>Make sure url is correct!!!</h1>");
            res.sendFile(path.join(process.cwd(), './ui/dist/index.html'));
        });
    }
}

export default new App().express;
