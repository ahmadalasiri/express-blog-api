import { Router } from 'express';

import { AuthController } from '../controller';
import { Routes } from '../interfaces/routes.interface';
import { loginValidator, signupValidator } from '../middleware/validation';

// import { loginValidator } from './../middleware/validation/auth.validator';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializerRoutes();
  }

  private initializerRoutes() {
    this.router.post(`${this.path}/signup`, signupValidator, this.authController.signup);
    this.router.post(`${this.path}/login`, loginValidator, this.authController.login);
  }
}
