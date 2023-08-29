import mongoose from 'mongoose';

import env from '../../src/utils/validateEnv';

const dbConnection = async () => {
  mongoose
    .connect(env.DB_URI)
    .then(conn => {
      console.log(`Database Connected ✌️ ${conn.connection.host} `);
    })
    .catch(err => {
      console.error(`error: ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
