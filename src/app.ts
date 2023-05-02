import * as dotenv from 'dotenv';
import express, { type Express } from 'express';

dotenv.config();

const app: Express = express();

export default app;
