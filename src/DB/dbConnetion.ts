import mongoose from 'mongoose';

import env from '../../src/utils/validateEnv';
import logger from '../log';

const dbConnection = async () => {
  mongoose
    .connect(env.DB_URI)
    .then(conn => {
      logger.info(`Database Connected ✌️ ${conn.connection.host} `);
    })
    .catch(err => {
      console.error(`error: ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
