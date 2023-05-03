import * as dotenv from 'dotenv';
import express, { type Express, Response } from 'express';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (_, res: Response) => {
  res.json({ message: 'Working' });
});

export default app;
