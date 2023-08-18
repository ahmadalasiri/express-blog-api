import { Router } from 'express';

import UserController from '../controller/user.controller';
import { Routes } from '../interfaces/routes.interface';

class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();
  constructor() {
    this.insitializeRoutes();
  }

  private insitializeRoutes() {
    this.router
      .route(`${this.path}`)
      .get(this.userController.getUsers)
      .post(this.userController.createUser);

    this.router
      .route(`${this.path}/:id`)
      .get(this.userController.getUser)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
  }
}

export default UserRoute;
