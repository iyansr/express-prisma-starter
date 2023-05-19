import prisma from '@app/shared/libs/prisma';
import type { FilterParams } from '@app/shared/types';

export const allUsers = async (params: FilterParams) => {
  const { page = 1, pageSize = 10 } = params;
  const skip = (page - 1) * pageSize;

  const [count, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
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

  return user;
};
