import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Todos Endpoints', () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://bhargavbook58:tester12345@todos.usujbgr.mongodb.net/todos?retryWrites=true&w=majority', {});
  });

  afterAll(async () => {
      await mongoose.connection.close();
  });

  it('GET /tasks - should retrieve all tasks', async () => {
    const res: any = await request(app).get('/api/todos/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBeTruthy()
  });
});
