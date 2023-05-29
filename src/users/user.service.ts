import type { User } from '@prisma/client';

import prisma from '../shared/libs/prisma';
import type { FilterParams } from '../shared/types';

// Exclude keys from user
function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

export const allUsers = async (params: FilterParams) => {
  const { page = 1, pageSize = 10 } = params;
  const skip = (page - 1) * pageSize;

  const [count, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      take: Number(pageSize),
      skip,
    }),
  ]);

  const totalPages = Math.ceil(count / pageSize); // Calculate total number of pages
  const hasNextPage = page < totalPages; // Determine if next page exists

  return { users, totalPages, hasNextPage };
};

export const detailUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return exclude<User, keyof User>(user as User, ['password']);
};

export const userByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};
