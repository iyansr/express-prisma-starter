import { hash } from 'bcrypt';
import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { omit } from 'lodash';

import { userByEmail } from '@app/users/user.service';

import { type LoginSchema } from './auth.schema';
import * as authService from './auth.service';

export const register: RequestHandler<unknown, unknown, LoginSchema> = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userByEmail(email);

    if (existingUser) {
      return next(createHttpError(409, 'User already exists'));
    }

    const salt = 10;
    const passwordHash = await hash(password, salt);

    const response = await authService.register({ email, password: passwordHash });

    return res.status(200).json({
      data: omit(response, 'password'),
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};
