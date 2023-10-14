import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { autoInjectable } from 'tsyringe';

import HttpException from '../exceptions/HttpException';
import { UserService } from '../services/users.service';

@autoInjectable()
class UserController {
  constructor(private readonly userService: UserService) {}
  // logged in user
  public updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.userService.updateUser(req.params.id, req.body);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ data: user });
  });

  public getMe = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ data: req.user });
  });

  public updateMe = asyncHandler(async (req: Request, res: Response) => {
    let user = await this.userService.updateUser(req.user._id, req.body);
    res.status(200).json({ data: user });
  });

  // Admin only
  public getUsers = asyncHandler(async (_req: Request, res: Response) => {
    let users = await this.userService.getUsers();
    res.status(200).json({ data: users });
  });
  public getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.userService.getUser(req.params.id);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ data: user });
  });

  public createUser = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    let user = await this.userService.createUser(req.body);
    res.status(201).json({ data: user });
  });

  public deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.userService.deleteUser(req.params.id);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.sendStatus(204);
  });

  public updateProfileImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.user?._id;
    if (!req.file) return next(new HttpException(400, 'Please upload a file'));

    let user = this.userService.updateProfileImage(userId!, req.file);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ data: user });
  });
}

export { UserController };
