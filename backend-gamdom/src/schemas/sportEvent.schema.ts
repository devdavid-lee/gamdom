import { z } from 'zod';

export const createSportEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  odds: z.coerce.number().positive('Odds must be a positive number'),
});

export const updateSportEventSchema = z.object({
  eventName: z.string().min(1, 'Event name is required').optional(),
  odds: z.coerce.number().positive('Odds must be a positive number').optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid UUID'),
});
