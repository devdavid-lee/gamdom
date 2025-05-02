import { Request, Response, NextFunction } from 'express';
import { SportEventService } from '../services';

export class SportEventController {
  static async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await SportEventService.getAllEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await SportEventService.getEventById(Number(req.params.id));
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await SportEventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await SportEventService.updateEvent(
        Number(req.params.id),
        req.body
      );
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await SportEventService.deleteEvent(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
