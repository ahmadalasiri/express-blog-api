import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '../../src/utils/validateEnv';
import HttpException from '../exceptions/HttpException';
import { AuthRequest } from '../interfaces/auth.interface';
import User from '../model/User.mode';

const verifyToken = asyncHandler(async (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];

    // 1- Check if token exist
    if (!token) {
      return next(
        new HttpException(401, `You are not authorized, you must login to get access this route`)
      );
    }

    // 2- Verify that the token has not changed
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    // 3- Check if the user still exists

    const user = await User.findById(decoded.userId);
    user;
    // if (!user) {
    //   return next(new HttpException(401, 'The user that belongs to this token no longer exists'));
    // }
  }

  next();
});

export { verifyToken };
