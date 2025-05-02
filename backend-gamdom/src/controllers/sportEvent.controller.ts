import { Request, Response, NextFunction } from 'express';
import { SportEventService } from '../services';

export class SportEventController {
  private sportEventService: SportEventService;

  constructor() {
    this.sportEventService = new SportEventService();
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.sportEventService.getAllEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await this.sportEventService.getEventById(req.params.id);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await this.sportEventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await this.sportEventService.updateEvent(
        req.params.id,
        req.body
      );
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await this.sportEventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
