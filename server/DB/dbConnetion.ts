import mongoose from "mongoose";

const dbConnection =async () => {

  if (!process.env.DB_URI) { // <-- Add guard clause to check for undefined value
    console.error("DB_URI environment variable is not defined");
    process.exit(1);
}
    mongoose.connect(process.env.DB_URI).then((conn) => {
        console.log(`Database Connected ^_^ ${conn.connection.host} `);
    })
    .catch((err) => {
        console.error(`error: ${err}`);
        process.exit(1);
    });
};

 
export default dbConnection;

 