import { Router } from 'express';

import * as userController from './user.controller';
import authenticateToken from '../shared/middlewares/verifyToken';

const userRoute = Router();

userRoute.get('/', authenticateToken, userController.getAllUsers);
userRoute.get('/:id', userController.detailUser);

export default userRoute;
