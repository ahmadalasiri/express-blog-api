import dotenv from 'dotenv';

import App from './app';
import UserRoute from './src/routes/user.route';

dotenv.config();

let app = new App([new UserRoute()]);

app.listen();
