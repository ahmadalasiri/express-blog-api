import jwt from 'jsonwebtoken';

export const createToken = (payload: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiration = process.env.JWT_EXPIRATION;
  return jwt.sign({ userId: payload }, jwtSecret!, { expiresIn: jwtExpiration });
};
