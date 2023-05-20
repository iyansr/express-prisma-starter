import { readFile } from 'fs/promises';
import path from 'path';

import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { type JwtPayload, verify } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? '';

    const rootPath = path.resolve(__dirname, '../../../');
    const key = await readFile(path.join(rootPath, 'public.pem'), 'utf8');
    const decoded = verify(token, key, {
      algorithms: ['RS256'],
      issuer: 'express-app',
    });
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    next(createHttpError(401, 'Unauthorized'));
  }
}

export default authenticateToken;
