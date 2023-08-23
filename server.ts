import dotenv from 'dotenv';

import App from './app';
import UserRoute from './src/routes/user.route';
import validateEnv from './src/utils/validateEnv';

dotenv.config();
validateEnv();
let app = new App([new UserRoute()]);

export let server = app.listen();
