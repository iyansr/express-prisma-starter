import { Router } from 'express';

import * as authController from './auth.controller';
import { loginSchema } from './auth.schema';
import { loginRegisterRateLimit } from '../shared/middlewares/rate-limit';
import validate from '../shared/middlewares/validate';

const authRoute = Router();

authRoute.post('/register', loginRegisterRateLimit, validate(loginSchema), authController.register);
authRoute.post('/login', loginRegisterRateLimit, validate(loginSchema), authController.login);

export default authRoute;
