import 'reflect-metadata';
import { container } from 'tsyringe';

import App from './app';
import { UserRoute } from './routes';
import { AuthRoute } from './routes';

const userRoute = container.resolve(UserRoute);
const authRoute = container.resolve(AuthRoute);

let app = new App([userRoute, authRoute]);

let server = app.listen();
let client = app.getServer();

export { server, client };
