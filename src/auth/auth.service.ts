import { readFile } from 'fs/promises';
import path from 'path';

import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

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

export async function generatJWT(email: string) {
  const rootPath = path.resolve(__dirname, '../../');
  const key = await readFile(path.join(rootPath, 'private.pem'), 'utf8');
  const token = sign({ email }, key, {
    algorithm: 'RS256',
    expiresIn: '7d',
    issuer: 'express-app',
  });
  return token;
}
