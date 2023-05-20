import { Router } from 'express';

import authRoute from './auth/auth.route';
import userRoute from './users/user.route';

const router = Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);

export default router;
