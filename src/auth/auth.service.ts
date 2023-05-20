import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isPasswordValid = await compare(password, hashedPassword);

  return isPasswordValid;
}

export function generatJWT(email: string) {
  const token = sign({ email }, process.env.PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '7d',
    issuer: 'express-app',
  });
  return token;
}
