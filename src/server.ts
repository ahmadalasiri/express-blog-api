import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import swaggerDocument from '../swagger.json';
import dbConnection from './DB/dbConnetion';
import { notFound } from './exceptions/notFound';
import './exceptions/shutdownHandler';
import { Routes } from './interfaces/routes.interface';
import { errorMiddleware } from './middleware/errors';
import env from './utils/validateEnv';

const swaggerDocument_yaml = YAML.load(`${process.cwd()}/swagger.yaml`);

class App {
  public app: express.Application;
  public port: number | string;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    dbConnection();
  }

  private initializeMiddlewares() {
    if (this.env === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeSwagger() {
    if (this.env === 'development') {
      this.app.use('/yaml-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument_yaml));
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  }

  private initializeErrorHandling() {
    this.app.use(notFound);
    this.app.use(errorMiddleware);
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening in ${process.env.NODE_ENV} mode on the port ${this.port}`);
    });
  }
}

export default App;
