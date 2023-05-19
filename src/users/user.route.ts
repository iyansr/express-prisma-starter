import { Router } from 'express';

import * as userController from './user.controller';

const userRoute = Router();

userRoute.get('/', userController.getAllUsers);
userRoute.get('/:id', userController.detailUser);

export default userRoute;
