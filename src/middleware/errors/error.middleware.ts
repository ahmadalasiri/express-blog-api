import { NextFunction, Request, Response } from 'express';

import HttpException from '../../exceptions/HttpException';

const handelCastErrorDB = (err: HttpException) => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new HttpException(400, message);
};

const handelDuplicateFieldsDB = (err: HttpException) => {
  let value = err.message.match(/(["'])(\\?.)*?\1/)![0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpException(400, message);
};

const handelValidationErrorDB = (err: HttpException) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpException(400, message);
};

const sendForDev = (err: HttpException, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendForProd = (err: HttpException, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
  }
};

export const errorMiddleware = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong';
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handelCastErrorDB(err);
    }
    if (err.code === 11000) {
      error = handelDuplicateFieldsDB(err);
    }
    if (err.name === 'ValidationError') {
      error = handelValidationErrorDB(err);
    }

    sendForProd(error, res);
  }
};
