import type { Application } from 'express';

import userRoute from './users/user.route';

export default function router(app: Application) {
  app.use('/api/users', userRoute);
}
