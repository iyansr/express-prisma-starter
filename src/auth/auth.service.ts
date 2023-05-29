import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import type { LoginSchema } from './auth.schema';
import prisma from '../shared/libs/prisma';

export async function register({ password, email }: LoginSchema) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await argon2.hash(password);

  return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isPasswordValid = await argon2.verify(hashedPassword, password);

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
