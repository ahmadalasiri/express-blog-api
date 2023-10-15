import { Router } from 'express';
import { autoInjectable } from 'tsyringe';

import { UserController } from '../controllers/user.controller';
import { Routes } from '../interfaces/routes.interface';
import { allowedTo, authenticateUser } from '../middleware/auth.middleware';
import { imageUpload } from '../middleware/uploadImages.middleware';
import { createUserValidator, deleteUserValidator, getUserValidator, updateLoggedUserValidator, updateUserValidator } from '../middleware/validation';

@autoInjectable()
class UserRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor(private readonly userController: UserController) {
    this.insitializeRoutes();
  }

  private insitializeRoutes() {
    this.router.use(`${this.path}`, authenticateUser);
    // Logged user
    this.router
      .route(`${this.path}/me`)
      .get(this.userController.getLoggedUser)
      .patch(updateLoggedUserValidator, this.userController.updateLoggedUser)
      .delete(this.userController.deleteLoggedUser);

    this.router.route(`${this.path}/profile-picture-upload`).patch(imageUpload.single('profilePicture'), this.userController.updateProfileImage);

    // Admin only
    this.router.use(`${this.path}`, allowedTo('admin'));
    this.router.route(`${this.path}`).get(this.userController.getUsers).post(createUserValidator, this.userController.createUser);

    this.router
      .route(`${this.path}/:id`)
      .get(getUserValidator, this.userController.getUser)
      .patch(updateUserValidator, this.userController.updateUser)
      .delete(deleteUserValidator, this.userController.deleteUser);
  }
}

export { UserRoute };
