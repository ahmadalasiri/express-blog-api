import { NextFunction, Request, Response } from 'express';

import HttpException from '../../exceptions/HttpException';

export const errorMiddleware = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    error: { statusCode: err.statusCode, status: err.status },
    message: err.message,
    stack: err.stack,
  });
};
