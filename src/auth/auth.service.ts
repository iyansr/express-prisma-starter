import prisma from '@app/shared/libs/prisma';

import type { LoginSchema } from './auth.schema';

export async function register({ password, email }: LoginSchema) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}
