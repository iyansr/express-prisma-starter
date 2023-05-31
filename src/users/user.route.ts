import { Router } from 'express';

import authenticateToken from '@app/shared/middlewares/verifyToken';
import * as userController from '@app/users/user.controller';

const userRoute = Router();

userRoute.get('/', authenticateToken, userController.getAllUsers);
userRoute.get('/:id', userController.detailUser);

export default userRoute;
