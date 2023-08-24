import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import HttpException from '../exceptions/HttpException';
import User from '../model/User.mode';
import { createToken } from '../utils/createToken';

export class AuthController {
  // Sign Up Function:
  // Validate the user input.
  // Check if the user already exists in the database.
  // If the user does not exist, hash the password using bcrypt.
  // Create a new user with bcryptbcryptbcryptthe hashed password and save it in the database.
  // Generate a JWT token for the user.
  // Send the token to the client.
  public signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, username, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      if (user.email === email) {
        return next(new HttpException(409, 'Email already in use'));
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
  // Login Function:
  // Validate the user input.
  // Check if the user exists in the database.
  // If the user exists, compare the hashed password in the database with the password provided by the user using bcrypt.
  // If the passwords match, generate a JWT token for the user.
  // Send the token to the client.
  // public login = asyncHandler(async (_req: Request, _res: Response, next: NextFunction) => {
  //   let { emailOrUsername } = req.body;
  //   // Check if the input is an email or a username
  //   const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
  //   const isUsername = /^[a-zA-Z0-9_]+$/.test(emailOrUsername);

  //   if (isEmail) {
  //     let user = await User.findOne({ email: emailOrUsername });
  //     if (user) next(HttpException);
  //   } else if (isUsername) {
  //     // The input is a username
  //     // Handle username signup logic
  //     // ...
  //   } else {
  //     // Invalid input
  //   }
  // });
}
