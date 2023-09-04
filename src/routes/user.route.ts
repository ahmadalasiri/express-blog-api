import { Router } from 'express';

import UserController from '../controller/user.controller';
import { Routes } from '../interfaces/routes.interface';
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from '../middleware/validation';
import { verifyToken } from '../middleware/auth.middleware';

class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.insitializeRoutes();
  }

  private insitializeRoutes() {
    this.router.use(verifyToken)
    this.router
      .route(`${this.path}`)
      .get(this.userController.getUsers)
      .post(createUserValidator, this.userController.createUser);

    this.router
      .route(`${this.path}/:id`)
      .get(getUserValidator, this.userController.getUser)
      .put(updateUserValidator, this.userController.updateUser)
      .delete(deleteUserValidator, this.userController.deleteUser);
  }
}

export { UserRoute };
