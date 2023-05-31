import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';

import router from './router';

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (_, res: Response) => {
  res.json({ message: 'Working', environtment: process.env.NODE_ENV });
});
app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.message);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: true, message: errorMessage });
});

app.listen(8082, () => {
  console.log(`server Runninn! on port ${8082}`);
});
