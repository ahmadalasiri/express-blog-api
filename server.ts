// import dotenv from 'dotenv';
import App from './app';
import { UserRoute } from './src/routes';
import { AuthRoute } from './src/routes';

let app = new App([new UserRoute(), new AuthRoute()]);

export let server = app.listen();
