import express from 'express';
import morgan from 'morgan';

import dbConnection from './src/DB/dbConnetion';
import { Routes } from './src/interfaces/routes.interface';
import { errorMiddleware, notFound } from './src/middleware/errors';
import './src/middleware/errors/shutdownHandler';

class App {
  public app: express.Application;
  public port: number | string;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
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
