import mongoose from 'mongoose';

import { server } from '../../server';

// Graceful shutdown //

// Handle process kill signal
// Stop new requests from client
// Close all data process
// Exit from process

process.on('SIGINT', () => {
  console.log('👋 SIGINT RECEIVED. Shutting down gracefully');
  console.log('Closing http server.');
  server.close(() => {
    mongoose.connection
      .close()
      .then(() => {
        console.log('MongoDb connection closed.');
        console.log('💥 Process terminated!');
        process.exit(1);
      })
      .catch(err => {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      });
  });
});

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
// uncaught exception in typescript
process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});
