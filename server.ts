import dotenv from 'dotenv';

import App from './app';
import { UserRoute } from './src/routes';
import { AuthRoute } from './src/routes';
import validateEnv from './src/utils/validateEnv';

dotenv.config();
validateEnv();
let app = new App([new UserRoute(), new AuthRoute()]);

export let server = app.listen();
