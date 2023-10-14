import { check } from 'express-validator';

import validatorMiddleware from '../errors/validation.middleware';

export const getPostValidator = [
  check('id').notEmpty().withMessage('Post id is required').isMongoId().withMessage('Post id is invalid'),

  validatorMiddleware,
];
