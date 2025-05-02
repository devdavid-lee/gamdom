import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  // Handle TypeORM errors
  if (err.name === 'QueryFailedError') {
    res.status(400).json({
      status: 'fail',
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
    return;
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'fail',
      message: ERROR_MESSAGES.INVALID_INPUT,
    });
    return;
  }

  // Handle unknown errors
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: ERROR_MESSAGES.SERVER_ERROR,
  });
};
