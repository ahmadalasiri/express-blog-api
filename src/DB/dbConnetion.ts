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
      logger.error(`Error: ${err.message}`);
      setTimeout(() => {
        process.exit(1);
      }, 100); // Delay the process
    });
};

export default dbConnection;
