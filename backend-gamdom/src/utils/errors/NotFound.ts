import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};