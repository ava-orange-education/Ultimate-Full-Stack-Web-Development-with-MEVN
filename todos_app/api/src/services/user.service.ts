import { UserResponse } from "../responses/user.response";
import { UserRepository } from '../repositories/user.repository'
import { IUserRepository } from '../repositories/user.interface'
import { IUser, UserModel } from '../models/user.model'
import { LoggerService } from "../logger/api.logger";

export class UserService {

    private userRepository: IUserRepository<IUser>;
    private logger: LoggerService;

    constructor() {
        this.userRepository = new UserRepository<IUser>(UserModel);
        this.logger = new LoggerService();
    }

    async signin(user: any): Promise<UserResponse> {
        this.logger.info('Service: signin')
        const result = await this.userRepository.getByEmailAndPassword(user.email, user.password);
        const response: UserResponse = {
            statusCode: 200,
            result
        };
        return response
    }

    async signup(user: any): Promise<UserResponse> {
        this.logger.info(`Service: Signup, ${user}`);
        const result = await this.userRepository.create(user);
        const response: UserResponse = {
            statusCode: 200,
            result
        };
        return response
    }

}