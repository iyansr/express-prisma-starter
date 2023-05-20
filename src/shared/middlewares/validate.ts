import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { type AnyZodObject, ZodError } from 'zod';

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
        message: err,
      });
    }
    next();
  }
};

export default validate;
