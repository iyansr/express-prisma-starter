import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import * as userService from './user.service';

export const getAllUsers: RequestHandler = async (_req, res, next) => {
  try {
    const { users, hasNextPage, totalPages } = await userService.allUsers({});

    return res.status(200).json({
      data: users,
      hasNextPage,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const detailUser: RequestHandler<{ id: string }, unknown, unknown> = async (
  req,
  res,
  next,
) => {
  try {
    const user = await userService.detailUser(req.params.id);

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
