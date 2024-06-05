import BaseService from './BaseService';

export interface User {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

class UserService extends BaseService<User> {
    
  constructor() {
    super('/api/user');
  }

  signin(data: User) {
    return this.post('/signin', data);
  }

  signup(data: User) {
    return this.post('/signup', data);
  }

}

export default new UserService();