import { check } from 'express-validator';

import validatorMiddleware from '../../middleware/errors/validation.middleware';

export const createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('User name is required')
    .isString()
    .withMessage('Name must be a string'),

  check('username').exists().withMessage('Username is required'),
  check('email')
    .notEmpty()
    .withMessage('User email is required')
    .isEmail()
    .withMessage('Email is invalid'),

  check('password')
    .notEmpty()
    .withMessage('User password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  validatorMiddleware,
];

export const updateUserValidator = [
  check('id')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('Invalid user id format '),

  check('email').optional().isEmail().withMessage('invalid email address'),
  check('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  check('name').optional().isString().withMessage('Name must be a string'),
  validatorMiddleware,
];

export const getUserValidator = [
  check('id')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('Invalid user id format '),

  validatorMiddleware,
];
export const deleteUserValidator = [
  check('id')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('Invalid user id format '),

  validatorMiddleware,
];
