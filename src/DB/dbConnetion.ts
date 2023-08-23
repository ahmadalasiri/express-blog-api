import mongoose from 'mongoose';

const dbConnection = async () => {
  mongoose
    .connect(process.env.DB_URI!)
    .then(conn => {
      console.log(`Database Connected ✌️ ${conn.connection.host} `);
    })
    .catch(err => {
      console.error(`error: ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
