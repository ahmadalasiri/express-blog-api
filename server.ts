import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/api/v1/healthz', (_, res) => {
  res.send({ status: 'OK ✌️' });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
