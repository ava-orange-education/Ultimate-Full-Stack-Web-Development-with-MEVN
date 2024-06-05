import express from "express";
import { UserController } from '../controllers/user.controller'
import { SignInRequest } from '../requests/signin.request';
import { SignUpRequest } from '../requests/signup.request';
import { UserResponse } from '../responses/user.response'
import { signinSchema, signupSchema } from "../validations/user.validation";
import { LoggerService } from "../logger/api.logger";
import rateLimit from 'express-rate-limit';

class User {

    public express: express.Application;
    private userController: UserController;
    private logger: LoggerService;

    constructor() {
        this.express = express();
        this.routes();
        this.userController = new UserController();
        this.logger = new LoggerService();
    }

    private routes(): void {

        // user signin
        this.express.post("/signin", async (req: express.Request<any, any, SignInRequest>, 
            res: express.Response<UserResponse>, next: express.NextFunction) => {

            const { error, value } = signinSchema.validate(req.body);

            if (error) {
              res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
              return;
            }
            console.log('req.body ', req.body)
            const result = await this.userController.signin(req.body);
            res.status(200).json(result);
        });

        // user signup
        this.express.post("/signup", async (req: express.Request<any, any, SignUpRequest>, 
            res: express.Response<UserResponse>, next: express.NextFunction) => {
            
            const { error, value } = signupSchema.validate(req.body);

            if (error) {
              res.status(400).json({ message: error.details[0].message, statusCode: 400, result: value });
              return;
            }

            const result = await this.userController.signup(req.body);
            res.status(200).json(result);
        });
    }
}

export default new User().express;