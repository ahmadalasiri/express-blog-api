import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import HttpException from '../exceptions/HttpException';
import User from '../model/User.mode';

class UserController {
  public createUser = asyncHandler(async (req: Request, res: Response) => {
    let user = await User.create(req.body);
    res.status(201).json({ user });
  });

  public getUsers = asyncHandler(async (_: Request, res: Response) => {
    let user = await User.find({});
    res.status(200).json({ user });
  });

  public getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findById(req.params.id);
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ user });
  });

  public updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return next(new HttpException(404, 'No user found'));
    res.status(200).json({ user });
  });

  public deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new HttpException(404, 'No user found'));
    console.log('delete fun');
    res.status(204).send;
  });
}

export default UserController;
