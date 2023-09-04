import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Document } from 'mongoose';

import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/User.interface';
import User from '../model/User.mode';
import { createToken } from '../utils/createToken';

export class AuthController {
  public signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, username, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      if (user.email === email) {
        return next(
          new HttpException(
            409,
            `E-Mail address ${email} is already exists, please pick a different one.`
          )
        );
      } else {
        return next(new HttpException(409, 'Username already in use'));
      }
    }
    password = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, username, password });

    const token = createToken(user._id);

    const userData = { _id: user._id, email: user.email, username: user.username };

    res.status(201).json({ data: userData, token });
  });

  public login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { emailOrUsername, password } = req.body;

    // Check if the input is an email or a username
    const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);

    let user: (IUser & Document) | null;

    if (isEmail) {
      user = await User.findOne({ email: emailOrUsername });
    } else {
      user = await User.findOne({ username: emailOrUsername });
    }

    if (!user || !(await bcrypt.compare(password, user.password)))
      return next(new HttpException(401, 'Incorrect (email | username) or password`'));

    let token = createToken(user._id);

    const userData = { _id: user._id, email: user.email, username: user.username };

    res.status(200).json({ data: userData, token });
  });
}
