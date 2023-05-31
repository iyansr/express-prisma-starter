import { Router } from 'express';

import { loginRegisterRateLimit } from '@app/shared/middlewares/rate-limit';
import validate from '@app/shared/middlewares/validate';

import * as authController from './auth.controller';
import { loginSchema } from './auth.schema';

const authRoute = Router();

authRoute.post('/register', loginRegisterRateLimit, validate(loginSchema), authController.register);
authRoute.post('/login', loginRegisterRateLimit, validate(loginSchema), authController.login);

export default authRoute;
