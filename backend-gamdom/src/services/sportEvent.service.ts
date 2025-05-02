import { AppDataSource } from '../dataSource';
import { SportEvent } from '../entities';
import { ICreateSportEvent, IUpdateSportEvent } from '../types';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';
import { Repository } from 'typeorm';

export class SportEventService {
  private sportEventRepository: Repository<SportEvent>;

  constructor() {
    this.sportEventRepository = AppDataSource.getRepository(SportEvent);
  }

  async getAllEvents() {
    try {
      return await this.sportEventRepository.find();
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENTS, 500);
    }
  }

  async getEventById(id: string) {
    try {
      const event = await this.sportEventRepository.findOneBy({ eventId: id });
      if (!event) {
        throw new AppError(ERROR_MESSAGES.EVENT_NOT_FOUND, 404);
      }
      return event;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENT, 500);
    }
  }

  async createEvent(eventData: ICreateSportEvent) {
    try {
      const event = this.sportEventRepository.create(eventData);
      return await this.sportEventRepository.save(event);
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.ERROR_CREATING_EVENT, 500);
    }
  }

  async updateEvent(id: string, eventData: IUpdateSportEvent) {
    try {
      const event = await this.getEventById(id);
      this.sportEventRepository.merge(event, eventData);
      return await this.sportEventRepository.save(event);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_UPDATING_EVENT, 500);
    }
  }

  async deleteEvent(id: string) {
    try {
      const event = await this.getEventById(id);
      await this.sportEventRepository.softDelete(event);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_DELETING_EVENT, 500);
    }
  }
}
