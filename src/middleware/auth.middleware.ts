import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '../../src/utils/validateEnv';
import HttpException from '../exceptions/HttpException';
import { AuthRequest } from '../interfaces/auth.interface';
import User from '../model/User.mode';

const checkTokenExists = (req: AuthRequest, next: NextFunction) => {
  if (!req.headers.authorization?.startsWith('Bearer')) {
    return next(
      new HttpException(401, `You are not authorized, you must login to get access this route`)
    );
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(
      new HttpException(401, `You are not authorized, you must login to get access this route`)
    );
  }

  return token;
};

const verifyTokenIntegrity = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};

const checkUserExists = async (userId: string, next: NextFunction) => {
  const user = await User.findById(userId);

  if (!user) {
    return next(new HttpException(401, 'The user that belongs to this token no longer exists'));
  }

  return user;
};

const authenticateUser = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = checkTokenExists(req, next);
    const decoded = verifyTokenIntegrity(token!);
    const user = await checkUserExists(decoded.userId, next);
    req.user = user!;
    next();
  }
);
export { authenticateUser };
