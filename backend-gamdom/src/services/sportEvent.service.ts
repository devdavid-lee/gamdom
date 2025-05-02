import { AppDataSource } from '../dataSource';
import { SportEvent } from '../entities';
import { ICreateSportEvent, IUpdateSportEvent } from '../types';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';

const sportEventRepository = AppDataSource.getRepository(SportEvent);

export class SportEventService {
  static async getAllEvents() {
    try {
      return await sportEventRepository.find();
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENTS, 500);
    }
  }

  static async getEventById(id: number) {
    try {
      const event = await sportEventRepository.findOneBy({ eventId: id });
      if (!event) {
        throw new AppError(ERROR_MESSAGES.EVENT_NOT_FOUND, 404);
      }
      return event;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENT, 500);
    }
  }

  static async createEvent(eventData: ICreateSportEvent) {
    try {
      const event = sportEventRepository.create(eventData);
      return await sportEventRepository.save(event);
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.ERROR_CREATING_EVENT, 500);
    }
  }

  static async updateEvent(id: number, eventData: IUpdateSportEvent) {
    try {
      const event = await this.getEventById(id);
      sportEventRepository.merge(event, eventData);
      return await sportEventRepository.save(event);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_UPDATING_EVENT, 500);
    }
  }

  static async deleteEvent(id: number) {
    try {
      const event = await this.getEventById(id);
      await sportEventRepository.remove(event);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(ERROR_MESSAGES.ERROR_DELETING_EVENT, 500);
    }
  }
}
