import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import fs from 'fs';

import User from '../DB/models/user.model';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/User.interface';
import { cloudinaryDeleteImage, cloudinaryUploadImage } from '../utils/cloudinary';
import { autoInjectable } from 'tsyringe';
import { AdminService } from '../services/admin.service';
import { AuthRequest } from '../interfaces/auth.interface';

@autoInjectable()
class AdminController {
  constructor(private readonly adminService: AdminService) { }

  public getUsers = asyncHandler(async (req: Request, res: Response) => {
    let users = await this.adminService.getUsers();
    res.status(200).json({ data: users });
  });
  public getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.adminService.getUser(req.params.id);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ data: user });
  });

  public createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.adminService.createUser(req.body);
    res.status(201).json({ data: user });
  })
  public updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await this.adminService.updateUser(req.params.id, req.body);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ data: user });
  });

  public updateProfileImage = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let userId = req.user?._id;
    if (!req.file) return next(new HttpException(400, 'Please upload a file'));

    this.adminService.updateProfileImage(userId!, req.file);
  })
}

export { AdminController };
