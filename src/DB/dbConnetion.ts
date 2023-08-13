import mongoose from 'mongoose';

const dbConnection = async () => {
  if (!process.env.DB_URI) {
    console.error('DB_URI environment variable is not defined');
    process.exit(1);
  }
  mongoose
    .connect(process.env.DB_URI as string)
    .then(conn => {
      console.log(`Database Connected ✌️ ${conn.connection.host} `);
    })
    .catch(err => {
      console.error(`error: ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
