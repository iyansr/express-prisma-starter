import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { type JwtPayload, verify } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? '';

    const decoded = verify(token, process.env.PRIVATE_KEY, {
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
