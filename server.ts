import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import dbConnection from './server/DB/dbConnetion';

dotenv.config();

dbConnection();

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/api/v1/healthz', (_, res) => {
  res.send({ status: 'OK ✌️' });
});

const PORT = process.env.PORT;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
