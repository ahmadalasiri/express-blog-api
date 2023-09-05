import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import HttpException from '../exceptions/HttpException';
import User from '../model/User.mode';

class UserController {
  public createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { email, username, password } = req.body;

    let existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      if (existing.email === email) {
        return next(
          new HttpException(
            409,
            `E-Mail address ${email} is already exists, please pick a different one.`
          )
        );
      } else return next(new HttpException(409, 'Username already in use'));
    }

    password = await bcrypt.hash(password, 10);
    let user = await User.create(req.body);

    res.status(201).json({ user });
  });

  public getUsers = asyncHandler(async (_: Request, res: Response) => {
    let users = await User.find({}).select('-password -updatedAt -__v');
    res.status(200).json({ results: users.length, users });
  });

  public getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findById(req.params.id).select('-password -updatedAt -__v');
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
    res.status(204).send();
  });

  // private async validateUniqueEmailAndUsername(
  //   email: string | undefined,
  //   username: string | undefined
  // ) {
  //   let existing = await User.findOne({ $or: [{ email }, { username }] });

  //   if (existing) {
  //     if (existing.email === email) {
  //       new HttpException(
  //         409,
  //         `E-Mail address ${email} already exists, please pick a different one.`
  //       );
  //     } else {
  //       new HttpException(409, `Username ${username} already in use`);
  //     }
  //   }
  // }
}

export default UserController;
