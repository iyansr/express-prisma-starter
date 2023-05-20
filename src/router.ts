import type { Application } from 'express';

import authRoute from './auth/auth.route';
import userRoute from './users/user.route';

export default function router(app: Application) {
  app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
}
