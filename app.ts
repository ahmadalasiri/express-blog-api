import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import dbConnection from './src/DB/dbConnetion';
import { Routes } from './src/interfaces/routes.interface';

class Server {
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
      this.app.use('/', route.router);
    });
  }
}

export default Server;
