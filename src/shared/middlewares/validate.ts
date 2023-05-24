import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, ZodError, type ZodIssue } from 'zod';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: true,
        message: err.flatten((issue: ZodIssue) => {
          return {
            message: issue.message,
            errorCode: issue.code,
            path: issue.path.join('.'),
          };
        }),
      });
    }
    next();
  }
};

export default validate;
