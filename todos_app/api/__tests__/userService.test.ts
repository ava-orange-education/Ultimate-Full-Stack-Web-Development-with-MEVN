import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/repositories/user.repository';
import { LoggerService } from '../src/logger/api.logger';
import { UserModel } from '../src/models/user.model';
import { mock } from 'node:test';

const mockUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'John Doe'
};

// Mock the UserRepository, LoggerService, and UserModel
jest.mock('../src/repositories/user.repository', () => {
    return {
        UserRepository: jest.fn().mockImplementation(() => ({
            getByEmailAndPassword: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser)
        }))
    };
});

jest.mock('../src/logger/api.logger');
jest.mock('../src/models/user.model');

describe('UserService', () => {
    let userService: UserService;

    // Mock user data
    

    beforeEach(() => {
        // Reset all implementations before each test
        //(UserRepository.prototype.getByEmailAndPassword as jest.Mock).mockClear();
        //(UserRepository.prototype.create as jest.Mock).mockClear();

        // Initialize UserService before each test
        userService = new UserService();
    });

    it('should sign in a user successfully', async () => {
        // Arrange
        const expectedResponse = { statusCode: 200, result: mockUser };

        // Act
        const response = await userService.signin({ email: mockUser.email, password: mockUser.password });

        // Assert
        expect(response).toEqual(expectedResponse);
        
    });

   it('should sign up a new user successfully', async () => {
        // Arrange
        const expectedResponse = { statusCode: 200, result: mockUser };
        //UserRepository.prototype.create = jest.fn().mockResolvedValue(mockUser);

        // Act
        const response = await userService.signup(mockUser);

        // Assert
        expect(response).toEqual(expectedResponse);
    });
});
