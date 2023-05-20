import { Router } from 'express';

import validate from '@app/shared/middlewares/validate';

import * as authController from './auth.controller';
import { loginSchema } from './auth.schema';

const authRoute = Router();

authRoute.post('/register', validate(loginSchema), authController.register);

export default authRoute;
