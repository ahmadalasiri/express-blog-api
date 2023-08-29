import { config } from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

if (process.env.NODE_ENV === 'testing') {
  config({ path: '.env.test' });
} else {
  config();
}

const validateEnv = cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str(),
  BASE_URL: url(),
  DB_URI: str(),
  JWT_SECRET: str(),
  JWT_EXPIRATION: str(),
});

export default validateEnv;
