import mongoose from 'mongoose';
import request from 'supertest';

import { server } from '../..';
import User from '../../model/User.mode';

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

const newUserData = {
  name: 'John Doe',
  email: 'John@gmail.com',
  username: 'JohnDoe',
  password: 'password123',
  confirmPassword: 'password123',
};

describe('user', () => {
  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const response = await request(server).post('/api/v1/users').send(newUserData);

      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
    });

    it('should return 409 if email already exists', async () => {
      // Create a user with the same email
      await User.create(newUserData);
      const response = await request(server).post('/api/v1/users').send(newUserData);

      expect(response.status).toBe(409);
      expect(response.body.message).toMatch('E-Mail address John@gmail.com is already exists');
    });

    it('should return 409 if username already exists', async () => {
      // Create a user with the same username
      await User.create(newUserData);

      const response = await request(server).post('/api/v1/users').send({
        name: 'John Doe',
        email: 'newEmail@gmail.com',
        username: 'JohnDoe',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toMatch('Username already in use');
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      // Create some users
      await User.create([
        {
          name: 'John Doe',
          email: 'john@example.com',
          username: 'johndoe',
          password: 'password123',
        },
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          username: 'janedoe',
          password: 'password456',
          confirmPassword: 'password456',
        },
      ]);

      const response = await request(server).get('/api/v1/users');

      expect(response.status).toBe(200);
      expect(response.body.users).toHaveLength(2);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a user by ID', async () => {
      // Create a user
      const createdUser = await User.create(newUserData);

      const response = await request(server).get(`/api/v1/users/${createdUser._id}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user._id).toBe(createdUser._id.toString());
    });

    it('should return 404 if user not found', async () => {
      const response = await request(server).get('/api/v1/users/64f0d1196cbe0251ae16b092');

      expect(response.status).toBe(404);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user', async () => {
      // Create a user
      const createdUser = await User.create(newUserData);

      const response = await request(server).put(`/api/v1/users/${createdUser._id}`).send({
        name: 'Updated Name',
      });

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user._id).toBe(createdUser._id.toString());
      expect(response.body.user.name).toBe('Updated Name');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(server).put('/api/v1/users/64f0d1196cbe0251ae16b092').send({
        name: 'Updated Name',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No user found');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user', async () => {
      // Create a user
      const createdUser = await User.create(newUserData);

      const response = await request(server).delete(`/api/v1/users/${createdUser._id}`);

      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });

    it('should return 404 if user not found', async () => {
      const response = await request(server).delete('/api/v1/users/64e3cb9978ed3b58c9b3a653');

      expect(response.status).toBe(404);
      expect(response.body.message).toBeDefined();
    });
  });
});
