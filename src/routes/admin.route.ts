import { Router } from 'express';

import { AdminController } from '../controllers/admin.controller';
import { Routes } from '../interfaces/routes.interface';
import { allowedTo, authenticateUser } from '../middleware/auth.middleware';
import { imageUpload } from '../middleware/uploadImages.middleware';
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from '../middleware/validation';

class UserRoute implements Routes {
  public path = '/admin';
  public userPath = 'admin/users';
  public router = Router();
  public adminController = new AdminController();

  constructor() {
    this.insitializeRoutes();
  }

  private insitializeRoutes() {
    this.router.use(`${this.path}`, authenticateUser, allowedTo('admin'));
    this.router
      .route(`${this.userPath}/profile-picture-upload/:id`)
      .put(imageUpload.single('profilePicture'), this.adminController.updateProfileImage);
    this.router
      .route(`${this.userPath}`)
      .get(this.adminController.getUsers)
      .post(createUserValidator, this.adminController.createUser);

    this.router
      .route(`${this.userPath}/:id`)
      .get(getUserValidator, this.adminController.getUser)
      .put(updateUserValidator, this.adminController.updateUser)
      .delete(deleteUserValidator, this.adminController.deleteUser);
  }
}

export { UserRoute };
