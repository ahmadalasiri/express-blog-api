import { NextFunction, Request, Response } from 'express';

import HttpException from '../../exceptions/HttpException';

const sendForDev = (err: HttpException, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendForProd = (err: HttpException, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const errorMiddleware = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendForProd(err, res);
  }
};
