import { cleanEnv, port, str, url } from 'envalid';

const validateEnv = () => {
  return cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    BASE_URL: url(),
    DB_URI: str(),
    JWT_SECRET: str(),
    JWT_EXPIRATION: str(),
  });
};

export default validateEnv;
