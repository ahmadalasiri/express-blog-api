import { UserRoute } from './routes';
import { AuthRoute } from './routes';
import App from './server';

let app = new App([new UserRoute(), new AuthRoute()]);

let server = app.listen();
let client = app.getServer();

export { server, client };
