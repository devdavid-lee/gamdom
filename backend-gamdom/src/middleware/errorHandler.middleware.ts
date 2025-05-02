import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';
import logger from '../utils/logger';

export const errorHandlerMiddleware = (
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

  if (err.name === 'QueryFailedError') {
    res.status(400).json({
      status: 'fail',
      message: ERROR_MESSAGES.DATABASE_ERROR,
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'fail',
      message: ERROR_MESSAGES.INVALID_INPUT,
    });
    return;
  }

  logger.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: ERROR_MESSAGES.SERVER_ERROR,
  });
};
