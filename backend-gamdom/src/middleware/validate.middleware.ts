import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';

export const validateMiddleware = (
  schema: AnyZodObject,
  location: 'body' | 'params' | 'query' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[location]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new AppError(ERROR_MESSAGES.INVALID_INPUT, 400, errors));
      } else {
        next(error);
      }
    }
  };
};
