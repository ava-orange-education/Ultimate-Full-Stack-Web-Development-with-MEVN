import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    signin(user: any): Promise<UserResponse> {
        console.info('Controller: signin', user)
        return this.userService.signin(user);
    }

    signup(user: any): Promise<UserResponse> {
        console.info('Controller: signup', user);
        return this.userService.signup(user);
    }

}